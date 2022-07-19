import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { flow, Instance, SnapshotOut, types } from 'mobx-state-tree';
import moment from 'moment';
import { Image } from 'react-native-image-crop-picker';

export const MessageModel = types.model('MessageModel', {
  type: types.optional(types.maybeNull(types.string), null),
  system: types.optional(types.maybeNull(types.boolean), null),
  text: types.maybe(types.string),
  createdAt: types.number,
  createdBy: types.maybe(types.string),
});

export interface Message extends Partial<SnapshotOut<typeof MessageModel>> {}

const MemberModel = types.model('Member', {
  uid: types.string,
  email: types.string,
  displayName: types.string,
});

export interface Member extends SnapshotOut<typeof MemberModel> {}

export const ChatRoomModel = types.model('ChatRoom', {
  id: types.string,
  membersUids: types.array(types.string),
  members: types.array(MemberModel),
  name: types.string,
  recentMessage: MessageModel,
  createdBy: types.string,
  createdAt: types.number,
  unreadCount: types.maybe(types.number),
  avatar: types.maybe(types.string),
});

export interface ChatRoom extends SnapshotOut<typeof ChatRoomModel> {}

export const chatInitialState: ChatSnapshot = {
  chatRooms: [],
  loading: false,
};

export const ChatModel = types
  .model('Chat', {
    chatRooms: types.array(ChatRoomModel),
    loading: types.boolean,
  })
  .views((self) => ({
    get sortedRooms(): ChatRoom[] {
      return self.chatRooms.sort((room1: ChatRoom, room2: ChatRoom) => {
        if (
          !room2.recentMessage?.createdAt &&
          !room1.recentMessage?.createdAt
        ) {
          return room2.createdAt - room1.createdAt;
        }
        if (!room2.recentMessage?.createdAt) {
          return 1;
        }
        if (!room1.recentMessage?.createdAt) {
          return -1;
        }
        return room2.recentMessage.createdAt - room1.recentMessage.createdAt;
      });
    },
  }))
  .actions((self) => {
    // @ts-ignore
    const reset = () => (self = chatInitialState);

    const loadRooms = flow(function* () {
      self.loading = true;
      const currentUser = auth().currentUser;

      if (!currentUser) {
        throw new Error('User must be non null');
      }

      const querySnapshot = yield firestore()
        .collection<ChatRoom>('chatRooms')
        .where('membersUids', 'array-contains', currentUser.uid)
        .get();

      self.chatRooms = querySnapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      }));
      self.loading = false;
    });

    const checkIn = flow(function* (roomId: string) {
      self.loading = true;
      const currentUser = auth().currentUser;

      if (!currentUser) {
        throw new Error('User must be non null');
      }

      yield firestore()
        .collection<ChatRoom>('chatRooms')
        .doc(roomId)
        .collection('memberMetaData')
        .doc(currentUser.uid)
        .set(
          {
            openedAt: +moment(),
          },
          { merge: true },
        );

      self.loading = false;
    });

    const addChatRoom = flow(function* (
      name: string,
      members: FirebaseAuthTypes.User[],
    ) {
      self.loading = true;
      const currentUser = auth().currentUser;

      if (!currentUser) {
        throw new Error('User must be non null');
      }

      const initialMessage = {
        createdAt: +moment(),
        system: true,
        text: `${
          currentUser.displayName || currentUser.email
        } created chat room with ${members
          .map((member) => member.displayName || member.email)
          .join(', ')}`,
      };

      const chatRoom = {
        name,
        membersUids: [...members.map((member) => member.uid)],
        members: [
          ...members.map(({ displayName, email, uid }) => ({
            uid,
            email,
            displayName,
          })),
        ],
        recentMessage: initialMessage,
        createdAt: +moment(),
        createdBy: currentUser.uid,
      };

      const chatRoomRef = yield firestore()
        .collection('chatRooms')
        .add(chatRoom);

      yield firestore()
        .collection('chatRooms')
        .doc(chatRoomRef.id)
        .collection('messages')
        .add(initialMessage);

      self.loading = false;
    });

    const editChatRoom = flow(function* (
      roomId: string,
      roomName: { newName: string; oldName: string },
      addMembers: FirebaseAuthTypes.User[],
      removeMembers: FirebaseAuthTypes.User[],
    ) {
      self.loading = true;

      const currentUser = auth().currentUser;
      const chatRoomRef = firestore().collection('chatRooms').doc(roomId);

      if (roomName.newName !== roomName.oldName) {
        yield chatRoomRef.update({ name: roomName.newName });
        const message = {
          createdAt: +moment(),
          system: true,
          text: `${
            currentUser?.displayName || currentUser?.email
          } changed the room name from '${roomName.oldName}' to '${
            roomName.newName
          }'`,
        };
        yield chatRoomRef.collection('messages').add(message);
        yield chatRoomRef.set({ recentMessage: message }, { merge: true });
      }

      if (addMembers.length) {
        yield chatRoomRef.update({
          members: firestore.FieldValue.arrayUnion(...addMembers),
        });
        yield chatRoomRef.update({
          membersUids: firestore.FieldValue.arrayUnion(
            ...addMembers.map(({ uid }) => uid),
          ),
        });

        const message = {
          createdAt: +moment(),
          system: true,
          text: `${
            currentUser?.displayName || currentUser?.email
          } added ${addMembers
            .map((member) => member.displayName || member.email)
            .join(', ')}`,
        };
        yield chatRoomRef.collection('messages').add(message);
        yield chatRoomRef.set({ recentMessage: message }, { merge: true });
      }

      if (removeMembers.length) {
        yield chatRoomRef.update({
          members: firestore.FieldValue.arrayRemove(...removeMembers),
        });
        yield chatRoomRef.update({
          membersUids: firestore.FieldValue.arrayRemove(
            ...removeMembers.map(({ uid }) => uid),
          ),
        });

        const message = {
          createdAt: +moment(),
          system: true,
          text: `${
            currentUser?.displayName || currentUser?.email
          } removed ${removeMembers
            .map((member) => member.displayName || member.email)
            .join(', ')}`,
        };
        yield chatRoomRef.collection('messages').add(message);
        yield chatRoomRef.set({ recentMessage: message }, { merge: true });
      }

      const updatedChatRoom = yield chatRoomRef.get();

      // @ts-ignore
      self.chatRooms = [
        updatedChatRoom,
        ...self.chatRooms.filter(({ id }) => id !== roomId),
      ];
      self.loading = false;
    });

    const addMessageToRoom = flow(function* (roomId: string, message: Message) {
      yield firestore()
        .collection('chatRooms')
        .doc(roomId)
        .collection('messages')
        .add(message);

      yield firestore()
        .collection('chatRooms')
        .doc(roomId)
        .set({ recentMessage: message }, { merge: true });
    });

    const sendMessage = flow(function* (
      uid: string,
      roomId: string,
      text: string,
    ) {
      const message = {
        createdAt: +moment(),
        createdBy: uid,
        text,
      };
      yield addMessageToRoom(roomId, message);
    });

    // @ts-ignore
    const sendImage = flow(function* (
      uid: string,
      roomId: string,
      image: Image,
    ) {
      const { path } = image;
      const extension = path.split('.').pop();

      const imageReference = storage().ref(
        `images/${roomId}/${+moment()}-${uid}.${extension}`,
      );
      yield imageReference.putFile(path);
      const imageUrl = yield imageReference.getDownloadURL();
      const message = {
        createdAt: +moment(),
        createdBy: uid,
        text: imageUrl,
      };
      yield addMessageToRoom(roomId, message);
    });

    const getUser = flow(function* (query: string) {
      const querySnapshot = yield firestore()
        .collection('users')
        .where('email', '==', query)
        .get();

      const res = querySnapshot.docs.map((doc) => doc.data());
      console.log('res', { res });
      return res;
    });

    return {
      reset,
      loadRooms,
      addChatRoom,
      editChatRoom,
      sendMessage,
      sendImage,
      checkIn,
      getUser,
    };
  });

/**
 * Chat instance. Also contains actions
 */
export interface Chat extends Instance<typeof ChatModel> {}

/**
 * The data of chat
 */
export interface ChatSnapshot extends SnapshotOut<typeof ChatModel> {}
