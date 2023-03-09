import { useEffect } from 'react';
import { useAppToast } from '@/providers';
import {
  createNewUser,
  authorize,
  forgotPassword,
  resetPassword,
  authSelector,
  clearAuthMessage,
  logout,
} from '@/redux/slices';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from './redux';
import { RegisterType, ResponseStatus } from '@/types';

export interface useAuthProps {
  handleAuthResetSuccess?: () => void;
  handleAuthUserSuccess?: () => void;
  handleRegisterUserSuccess?: () => void;
}

export const useAuth = (callbackFunc?: useAuthProps) => {
  const appToast = useAppToast();
  const router = useRouter();
  const { message, error, loading, accessToken, status } =
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

  const onLogin = async (identifier: string, password: string) => {
    await dispatch(authorize({ identifier, password }));
  };

  const onForgotPassword = async (email: string) => {
    await dispatch(forgotPassword({ email }));
  };

  const onResetPassword = async (token: string, password: string) => {
    await dispatch(resetPassword({ token, password }));
  };
  return {
    isAuthenticated: accessToken ? true : false,
    accessToken: accessToken,
    onCreateNewUser,
    onLogin,
    onForgotPassword,
    onResetPassword,
    onLogout: () => {
      dispatch(logout());
      router.push('/');
    },
  };
};
