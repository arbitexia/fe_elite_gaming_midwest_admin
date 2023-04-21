import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ResponseStatus } from '@/constants';
import { useAppToast } from '@/providers';
import {
  createNewUser,
  updateUser,
  updateProfile,
  authorize,
  forgotPassword,
  resetPassword,
  changePasswordUser,
  authSelector,
  clearAuthMessage,
  logout,
} from '@/redux/slices';
import { useAppDispatch, useAppSelector } from './redux';
import { RegisterType, UpdateUserParam, UserType } from '@/types';

export interface useAuthProps {
  handleAuthResetSuccess?: () => void;
  handleAuthUserSuccess?: () => void;
  handleRegisterUserSuccess?: () => void;
}

export const useAuth = (callbackFunc?: useAuthProps) => {
  const appToast = useAppToast();
  const router = useRouter();
  const { message, error, loading, accessToken, status, user, role } =
    useAppSelector(authSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loading) return;
    error && appToast({ severity: 'error', message: error });
    if (status === ResponseStatus.SUCCESS && message) {
      appToast({ severity: 'success', message: message });
      dispatch(clearAuthMessage(''));
      callbackFunc?.handleAuthUserSuccess &&
        callbackFunc?.handleAuthUserSuccess();
      callbackFunc?.handleAuthResetSuccess &&
        callbackFunc?.handleAuthResetSuccess();
      callbackFunc?.handleRegisterUserSuccess &&
        callbackFunc?.handleRegisterUserSuccess();
    }
  }, [loading]);

  const onCreateNewUser = async (param: RegisterType) => {
    await dispatch(createNewUser(param));
  };

  const onUpdateUser = async (param: UpdateUserParam) => {
    await dispatch(updateUser(param));
  };

  const onUpdateProfile = async (param: UpdateUserParam) => {
    await dispatch(updateProfile(param));
  };

  const onLogin = async (identifier: string, password: string) => {
    await dispatch(authorize({ identifier, password }));
  };

  const onForgotPassword = async (email: string) => {
    await dispatch(forgotPassword({ email }));
  };

  const onResetPassword = async (token: string, password: string) => {
    await dispatch(resetPassword({ token, password }));
  };

  const onChangePasswordUser = async (param: UserType.ChangePasswordParam) => {
    await dispatch(changePasswordUser(param));
  };
  return {
    isAuthenticated: accessToken ? true : false,
    accessToken: accessToken,
    me: user,
    onCreateNewUser,
    onUpdateUser,
    onLogin,
    onForgotPassword,
    onResetPassword,
    onUpdateProfile,
    onChangePasswordUser,
    onLogout: () => {
      dispatch(logout());
      router.push('/');
    },
  };
};
