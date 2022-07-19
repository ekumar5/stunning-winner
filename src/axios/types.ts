import { AxiosPromise } from 'axios';

type User = { name: null; email: null; token: null };

type LoginResponse =
  | {
      needsMfa: boolean;
      exampleMfaSetupToken: string;
    }
  | User;

export type RegisterResponse =
  | {
      needsMfaSetup: boolean;
      mfaSetupToken: string;
    }
  | User;

export type LoginApi = (
  email: string,
  password: string,
) => AxiosPromise<LoginResponse>;
export type RegisterApi = (
  name: string,
  email: string,
  password: string,
) => AxiosPromise<RegisterResponse>;
export type ResetPasswordApi = (email: string) => AxiosPromise<boolean>;
export type SetupMfaApi = (email: string) => AxiosPromise<User>;
export type VerifyMfaApi = (
  code: string,
  mfaToken: string,
) => AxiosPromise<User>;
export type ResendApi = (mfaToken: string) => void;
