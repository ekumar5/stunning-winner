import firestore, {
  DocumentSnapshot,
  QuerySnapshot,
} from '@react-native-firebase/firestore';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import 'dayjs/locale/en-gb';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {
  AvatarProps,
  Bubble,
  Day,
  GiftedChat,
  Message as ChatMessage,
  Time,
} from 'react-native-gifted-chat';
import { ComposerProps } from 'react-native-gifted-chat/lib/Composer';
import { DayProps } from 'react-native-gifted-chat/lib/Day';
import { MessageProps } from 'react-native-gifted-chat/lib/Message';
import { MessageImageProps } from 'react-native-gifted-chat/lib/MessageImage';
import { IChatMessage } from 'react-native-gifted-chat/lib/Models';
import { TimeProps } from 'react-native-gifted-chat/lib/Time';
import ImagePickerLib from 'react-native-image-crop-picker';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { AppStackParamList } from '../../../containers/Navigator';
import { ChatRoom, Message } from '../../../mobx/chat';
import { useMst } from '../../../mobx/useMst';
import Avatar from '../../atoms/Avatar/Avatar';
import Header from '../../molecules/Header/Header';
import MessageImage from '../../molecules/MessageImage/MessageImage';
import { BottomMenuPicker } from '../../organisms/BottomMenuPicker/BottomMenuPicker';
import ScreenTemplate from '../../templates/ScreenTemplate/ScreenTemplate';
import {
  InputContainer,
  LeftIcon,
  RightIcon,
  StyledInput,
  StyledSystemMessage,
  StyledText,
} from './ChatDetailsScreen.styles';

const DEFAULT_USERNAME = 'unknown user';

export type GiftedChatMessage = IChatMessage & Message;
export type ChatDetailsRouteProps = RouteProp<AppStackParamList, 'ChatDetails'>;

const ChatDetailsScreen = observer(() => {
  const { goBack, navigate } = useNavigation();
  const { roomId } = useRoute<ChatDetailsRouteProps>().params;
  const { colors } = useTheme();

  const [text, setText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [pickerVisible, setPickerVisible] = useState<boolean>(false);

  const {
    chat: { chatRooms, sendMessage, sendImage, checkIn },
    user: { firebase: firebaseUser },
  } = useMst();

  const flexStyles = { flex: 1 };

  const chatRoom = chatRooms.find(({ id }) => id === roomId);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = firestore()
      .collection<ChatRoom>('chatRooms')
      .doc(roomId)
      .collection('messages')
      .onSnapshot((snapshot: QuerySnapshot<Message>) => {
        setLoading(false);
        const messagesData = snapshot.docs
          .map((doc: DocumentSnapshot<Message>) => ({
            _id: doc.id,
            ...doc.data(),
          }))
          .sort((m1: Message, m2: Message) => m2.createdAt - m1.createdAt);
        setMessages(messagesData);
      });

    checkIn(roomId);

    return () => {
      checkIn(roomId);
      unsubscribe();
    };
  }, [roomId]);

  useEffect(() => {
    if (!chatRoom) {
      goBack();
    }
  }, [chatRoom]);

  if (!chatRoom) {
    return null;
  }

  // @ts-ignore
  const processedMessages: GiftedChatMessage[] = messages.map((message) => {
    const user = chatRoom.members.find(
      (member) => member.uid === message.createdBy,
    );

    let isImage = false;

    if (/http.*\.(jpeg|jpg|gif|png|heic|webp)/i.test(message.text)) {
      // Message is a link to an image
      isImage = true;
    }

    return {
      ...message,
      text: isImage ? undefined : message.text,
      image: isImage ? message.text : undefined,
      user: user && {
        _id: user.uid,
        name: user.displayName || user.email,
      },
    };
  });

  const currentUser = {
    _id: firebaseUser?.uid ?? DEFAULT_USERNAME,
    name: firebaseUser?.displayName ?? firebaseUser?.email ?? DEFAULT_USERNAME,
  };

  const attachImage = (type: string) => {
    const action =
      type === 'camera' ? ImagePickerLib.openCamera : ImagePickerLib.openPicker;

    action({
      width: 1280,
      height: 720,
      cropping: true,
      cropperActiveWidgetColor: colors.primary,
      cropperStatusBarColor: colors.background,
      cropperToolbarColor: colors.background,
      cropperToolbarWidgetColor: colors.primary,
      freeStyleCropEnabled: true,
      compressImageQuality: 0.8,
      mediaType: 'photo',
      forceJpg: true,
      enableRotationGesture: true,
    }).then((image) => sendImage(currentUser._id, roomId, image));
  };

  const pickerItems = [
    { id: 'camera', title: 'Take Photo', iconLeft: 'camera' },
    { id: 'photo', title: 'Upload Photo', iconLeft: 'image' },
  ];

  const onSend = (message: string) => {
    if (!message) {
      return;
    }
    sendMessage(currentUser._id, roomId, message);
  };

  const loadEarlier = async () => {
    // TODO
  };

  const renderSystemMessage = ({
    currentMessage,
    renderBubble,
    renderAvatar,
  }: MessageProps<GiftedChatMessage>) => {
    if (!currentMessage) {
      return null;
    }

    const { type } = currentMessage;

    if (!type) {
      return <StyledSystemMessage currentMessage={currentMessage} />;
    }

    return (
      <ChatMessage<GiftedChatMessage>
        key={currentMessage.createdAt}
        renderDay={() => null}
        renderAvatar={renderAvatar}
        currentMessage={{ ...currentMessage, system: false }}
        renderBubble={renderBubble}
      />
    );
  };

  const renderBubble = ({
    currentMessage,
    user,
    ...rest
  }: MessageProps<GiftedChatMessage>) => {
    if (!currentMessage) {
      return null;
    }

    const textStyle = {
      left: {
        color: colors.text,
      },
      right: {
        color: colors.headerText,
      },
    };
    const wrapperStyle = {
      right: {
        backgroundColor: colors.primary,
      },
      left: {
        backgroundColor: colors.surface,
      },
    };

    const renderUsername = () =>
      user && currentMessage.user?._id !== user._id ? (
        <StyledText>{currentMessage.user?.name || DEFAULT_USERNAME}</StyledText>
      ) : null;

    const renderTime = (props: TimeProps<GiftedChatMessage>) =>
      !currentMessage.system ? (
        <>
          {renderUsername()}
          <Time
            timeTextStyle={{
              left: {
                color: colors.placeholder,
              },
              right: {},
            }}
            {...props}
          />
        </>
      ) : null;

    return (
      <Bubble
        {...rest}
        user={user}
        currentMessage={currentMessage}
        renderTime={renderTime}
        textStyle={textStyle}
        wrapperStyle={wrapperStyle}
      />
    );
  };

  const renderDay = (props: DayProps<GiftedChatMessage>) => (
    <Day textStyle={{ color: colors.placeholder }} {...props} />
  );

  const renderAvatar = ({ currentMessage }: AvatarProps<GiftedChatMessage>) => {
    if (!currentMessage) {
      return null;
    }

    const uri =
      typeof currentMessage.user.avatar === 'string'
        ? currentMessage.user.avatar
        : null;

    return (
      <Avatar
        color={colors.headerText}
        style={{ backgroundColor: colors.primary }}
        uri={uri}
        title={currentMessage.user?.name || DEFAULT_USERNAME}
        size={36}
      />
    );
  };

  const renderInput = (props: ComposerProps) => {
    const onPress = () => {
      if (props.text) {
        onSend(props.text);
      }
      if (props.onTextChanged) {
        props.onTextChanged('');
      }
    };

    return (
      <InputContainer>
        {
          <Pressable onPress={() => setPickerVisible(true)}>
            <LeftIcon>
              <Icon name="paperclip" size={24} color={colors.headerText} />
            </LeftIcon>
          </Pressable>
        }
        <StyledInput
          value={props.text}
          multiline={false}
          dense
          onSubmitEditing={onPress}
          onChangeText={props.onTextChanged}
          {...props}
        />
        <Pressable onPress={onPress}>
          <RightIcon>
            <Icon name="arrow-up" size={24} color={colors.headerText} />
          </RightIcon>
        </Pressable>
      </InputContainer>
    );
  };

  const renderMessageImage = (props: MessageImageProps<GiftedChatMessage>) => (
    <MessageImage {...props} />
  );

  const renderLoading = () => <ActivityIndicator style={flexStyles} />;

  const loadingEarlier = false;

  return (
    <>
      <ScreenTemplate>
        <Header
          title={chatRoom?.name}
          backArrow
          topRight={() => (
            <TouchableOpacity
              onPress={() => navigate('EditRoom', { chatRoom })}>
              <MaterialIcon size={24} name="edit" color={colors.surface} />
            </TouchableOpacity>
          )}
        />
        <KeyboardAvoidingView
          keyboardVerticalOffset={100}
          behavior={Platform.select({ ios: 'padding' })}
          style={flexStyles}>
          {loading ? (
            renderLoading()
          ) : (
            <GiftedChat<GiftedChatMessage>
              // @ts-ignore
              renderSystemMessage={renderSystemMessage}
              renderMessageImage={renderMessageImage}
              wrapInSafeArea={false}
              isKeyboardInternallyHandled={false}
              renderAvatar={renderAvatar}
              renderDay={renderDay}
              renderBubble={renderBubble}
              // @ts-ignore
              renderInputToolbar={renderInput}
              text={text}
              onInputTextChanged={setText}
              scrollToBottom
              isLoadingEarlier={loadingEarlier}
              onLoadEarlier={loadEarlier}
              locale="en-gb"
              messages={processedMessages}
              user={currentUser}
            />
          )}
        </KeyboardAvoidingView>
      </ScreenTemplate>
      <BottomMenuPicker
        onItemPress={attachImage}
        data={pickerItems}
        visible={pickerVisible}
        onDismiss={() => setPickerVisible(false)}
      />
    </>
  );
});

export default ChatDetailsScreen;
