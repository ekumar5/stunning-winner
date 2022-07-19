const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

const removeAllUsers = async () => {
  const listUsersResult = await admin.auth().listUsers(1000);
  functions.logger.log('Listed users', listUsersResult);
  const uids = listUsersResult.users.map(({ uid }) => uid);
  const deleteResult = await admin.auth().deleteUsers(uids);
  functions.logger.log('Deleted users', deleteResult);
  return deleteResult;
};

const removeProfile = async (userRecord) => {
  console.log('removing profile', userRecord);
  // TODO: delete user from chat rooms
  return await db.collection('users').doc(userRecord.uid).delete();
};

const searchUsersByPhone = async (phoneNumbers) => {
  const chunks = [];
  while (phoneNumbers.length) {
    chunks.push(phoneNumbers.splice(0, 10));
  }

  const promises = chunks.map(async (chunk) => {
    const querySnapshot = await db
      .collection('users')
      .where('phoneNumber', 'in', chunk)
      .get();
    return querySnapshot.docs.map((doc) => doc.data());
  });

  const results = await Promise.all(promises);
  return results.flat();
};

const sendMessageNotifications = async (snap, context) => {
  const messageData = snap.data();
  if (messageData.dontNotify) {
    return;
  }
  functions.logger.log('Sending message', messageData);

  const { roomId } = context.params;
  const roomData = (await db.collection('chatRooms').doc(roomId).get()).data();
  functions.logger.log('Fetched room data', roomData);

  const sender = roomData.members.find(
    ({ uid }) => uid === messageData.createdBy,
  );

  const tokens = roomData.members
    .map((member) => member.token)
    .filter((member) => member.uid !== sender.uid);

  const title = sender.displayName || sender.email;
  const body = messageData.text;

  const payload = {
    notification: {
      title,
      body,
    },
    data: {
      roomId,
      senderUid: sender.uid,
    },
    tokens,
  };

  functions.logger.log('Sending notification', payload);

  const response = await admin.messaging().sendMulticast(payload);

  functions.logger.log('Sent notification', response);
};

exports.authOnDelete = functions.auth.user().onDelete(removeProfile);
exports.searchUsersByPhone = functions.https.onCall(searchUsersByPhone);
exports.removeAllUsers = functions.https.onRequest(removeAllUsers);
exports.sendMessageNotifications = functions.firestore
  .document('chatRooms/{roomId}/messages/{messageId}')
  .onCreate(sendMessageNotifications);
