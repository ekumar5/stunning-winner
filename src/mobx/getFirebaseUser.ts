import auth from '@react-native-firebase/auth';

export const getFirebaseUser = () => {
  const currentUser = auth()?.currentUser;
  if (!currentUser) {
    return null;
  }

  const {
    email,
    displayName,
    emailVerified,
    providerId,
    uid,
    phoneNumber,
    photoURL,
    isAnonymous,
  } = currentUser;

  return {
    email,
    displayName,
    emailVerified,
    providerId,
    uid,
    phoneNumber,
    photoURL,
    isAnonymous,
  };
};
