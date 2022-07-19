import { flow, getParent, Instance, SnapshotOut, types } from 'mobx-state-tree';
import api from '../axios/api';
import { MFA_TYPE_EMAIL } from '../utils/constants';
import { ApiError } from './commonModels';
import { RootStore } from './index';

export const mfaInitialState: MfaSnapshot = {
  mfaType: MFA_TYPE_EMAIL,
  mfaToken: null,
  error: null,
  loading: false,
};

export const MfaModel = types
  .model('Mfa', {
    mfaType: types.maybeNull(types.string),
    mfaToken: types.maybeNull(types.string),
    loading: types.boolean,
    error: types.maybeNull(ApiError),
  })
  .actions((self) => ({
    reset: () => {
      self = mfaInitialState;
    },
    setToken: (token: string | null) => {
      self.mfaToken = token;
    },
    setupMfa: flow(function* (email: string) {
      self.loading = true;
      const response = yield api.setupMfa(email);
      self.mfaToken = response.data.mfaToken;
      self.loading = false;
    }),
    verifyMfa: flow(function* (code: string) {
      if (!self.mfaToken) {
        throw new Error('Mfa Token missing');
      }
      self.loading = true;
      const response = yield api.verifyMfa(code, self.mfaToken);
      const { user } = getParent<RootStore>(self);
      user.setUser(response.data);
      self.loading = false;
    }),
    resend: flow(function* () {
      if (!self.mfaToken) {
        throw new Error('Mfa Token missing');
      }
      self.loading = true;
      yield api.resend(self.mfaToken);
      self.loading = false;
    }),
  }));

export interface Mfa extends Instance<typeof MfaModel> {}

export interface MfaSnapshot extends SnapshotOut<typeof MfaModel> {}
