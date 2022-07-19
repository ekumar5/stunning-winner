import { client } from './client';
import {
  LoginApi,
  RegisterApi,
  RegisterResponse,
  ResendApi,
  ResetPasswordApi,
  SetupMfaApi,
  VerifyMfaApi,
} from './types';

const login: LoginApi = (email, password) =>
  client.post(
    '/login',
    {
      email,
      password,
    },
    { params: { mfa: true } },
  );

const register: RegisterApi = (name, email, password) =>
  client.post<RegisterResponse>(
    '/register',
    { name, email, password },
    { params: { mfa: true } },
  );

const resetPassword: ResetPasswordApi = (email) =>
  client.post('/reset', { email });

const setupMfa: SetupMfaApi = (email) =>
  client.post('/mfa/setup', { email }, { params: { mfa: true } });

const verifyMfa: VerifyMfaApi = (code, mfaToken) =>
  client.post('/mfa/verify', { code, mfaToken }, { params: { mfa: true } });

const resend: ResendApi = (mfaToken) =>
  client.post('/mfa/resend', { mfaToken });

export default {
  login,
  register,
  resetPassword,
  setupMfa,
  verifyMfa,
  resend,
};
