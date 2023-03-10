import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ResponseStatus } from '@/constants';
import { useAppToast } from '@/providers';
import {
  authorize,
  forgotPassword,
  resetPassword,
  authSelector,
  clearAuthMessage,
  logout,
} from '@/redux/slices';
import { useAppDispatch, useAppSelector } from './redux';

export interface useAuthProps {
  handleAuthResetSuccess?: () => void;
  handleAuthUserSuccess?: () => void;
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
    }
  }, [loading]);

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
    onLogin,
    onForgotPassword,
    onResetPassword,
    onLogout: () => {
      dispatch(logout());
      router.push('/');
    },
  };
};
