import { UserType } from './users.type';
import { RoleType } from './role.type';

export type RefreshTokenPrams = {
  refreshToken: string;
};

export type AdminAuthParams = {
  identifier: string;
  password: string;
};

export type ForgotPasswordParams = {
  email: string;
};

export type ResetPasswordParams = {
  token: string;
  password: string;
};

export type RefreshTokenType = {
  accessToken: string;
};

export type AdminAuthType = {
  user: UserType.User;
  role: RoleType.Role;
  accessToken: string;
  refreshToken: string;
};

export type ResetPasswordType = {
  message: string;
};

export type ForgotPasswordType = {
  message: string;
};
