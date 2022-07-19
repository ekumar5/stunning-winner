import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { flow, getParent, Instance, SnapshotOut, types } from 'mobx-state-tree';
import api from '../axios/api';
import { LoginFormValues } from '../components/organisms/LoginForm/LoginForm.props';
import { RegisterFormValues } from '../components/organisms/RegisterForm/RegisterForm.props';
import { ResetPasswordFormValues } from '../components/organisms/ResetPasswordForm/ResetPasswordForm.props';
import { ApiError } from './commonModels';
import { getFirebaseUser } from './getFirebaseUser';
import { RootStore } from './index';

export const userInitialState: UserSnapshot = {
  name: null,
  email: null,
  token: null,
  loading: false,
  error: null,
  firebase: null,
  needsMfa: false,
  needsMfaSetup: false,
  mfaToken: null,
  mfaSetupToken: null,
};

export const FirebaseUserModel = types.model('FirebaseUser', {
  displayName: types.maybeNull(types.string),
  providerId: types.string,
  email: types.maybeNull(types.string),
  emailVerified: types.maybe(types.boolean),
  uid: types.string,
  phoneNumber: types.maybeNull(types.string),
  photoURL: types.maybeNull(types.string),
  isAnonymous: types.boolean,
});

export const UserModel = types
  .model('User', {
    name: types.maybeNull(types.string),
    email: types.maybeNull(types.string),
    token: types.maybeNull(types.string),
    mfaToken: types.maybeNull(types.string),
    mfaSetupToken: types.maybeNull(types.string),
    firebase: types.maybeNull(FirebaseUserModel),
    needsMfa: types.optional(types.boolean, false),
    needsMfaSetup: types.optional(types.boolean, false),
    loading: types.boolean,
    error: types.maybeNull(ApiError),
  })
  .actions((self) => {
    const reset = () => {
      self = userInitialState;
    };
    const setUser = (data: UserSnapshot) => {
      console.log('setUser', data);
      if (!data.token) {
        // MFA
        self.mfaToken = data.mfaToken;
        self.mfaSetupToken = data.mfaSetupToken;
        self.needsMfa = data.needsMfa;
        self.needsMfaSetup = data.needsMfaSetup;
        getParent<RootStore>(self).mfa.setToken(data.mfaToken);
        return;
      }

      self.firebase = getFirebaseUser();
      self.name = data.name;
      self.email = data.email;
      self.token = data.token;
    };

    const login = flow(function* (data: LoginFormValues) {
      const { email, password } = data;
      self.loading = true;
      const response = yield api.login(email, password);
      try {
        yield auth().signInWithEmailAndPassword(email, password);
      } catch (error) {
        if (error.code === 'auth/user-not-found') {
          yield auth().createUserWithEmailAndPassword(email, password);
        } else {
          throw error;
        }
      }
      setUser(response.data);
      self.loading = false;
      return self;
    });

    const register = flow(function* (data: RegisterFormValues) {
      const { name, email, password } = data;
      self.loading = true;
      const response = yield api.register(name, email, password);
      try {
        yield auth().signInWithEmailAndPassword(email, password);
      } catch (error) {
        if (error.code === 'auth/user-not-found') {
          yield auth().createUserWithEmailAndPassword(email, password);
        } else {
          throw error;
        }
      }
      setUser(response.data);
      const user = getFirebaseUser();
      if (!user) {
        throw new Error('No user found');
      }

      yield firestore()
        .collection('users')
        .doc(user.uid)
        .set(user, { merge: true });

      self.loading = false;
      return self;
    });

    const resetPassword = flow(function* (data: ResetPasswordFormValues) {
      const { email } = data;
      self.loading = true;
      yield api.resetPassword(email);
      self.loading = false;
      return self;
    });

    return {
      reset,
      setUser,
      login,
      register,
      resetPassword,
    };
  });

/**
 * User instance. Also contains actions
 */
export interface User extends Instance<typeof UserModel> {}

/**
 * The data of user
 */
export interface UserSnapshot extends SnapshotOut<typeof UserModel> {}
