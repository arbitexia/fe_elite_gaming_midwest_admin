import { useEffect, useState } from 'react';
import { useAppToast } from '@/providers';
import {
  authorize,
  forgotPassword,
  resetPassword,
  authSelector,
  clearAuthMessage,
  logout,
} from '@/redux/slices';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from './redux';
import { ResponseStatus, AuthCallbackStatus } from '@/types';

export interface useAuthProps {
  handleAuthResetSuccess?: () => void;
  handleAuthUserSuccess?: () => void;
  handleAuthForgotSuccess?: () => void;
}

export const useAuth = ({
  handleAuthResetSuccess,
  handleAuthUserSuccess,
  handleAuthForgotSuccess,
}: useAuthProps) => {
  const appToast = useAppToast();
  const router = useRouter();
  const authState = useAppSelector(authSelector);
  const dispatch = useAppDispatch();
  const [callbackNo, setCallbackNo] = useState<AuthCallbackStatus>(
    AuthCallbackStatus.LOGIN
  );

  useEffect(() => {
    if (authState.status === ResponseStatus.FAILED && authState.errorMessage) {
      appToast({ severity: 'error', message: authState.errorMessage });
      dispatch(clearAuthMessage(''));
    }
    if (authState.status === ResponseStatus.SUCCESS && authState.message) {
      appToast({ severity: 'success', message: authState.message });
      dispatch(clearAuthMessage(''));
      if (callbackNo == AuthCallbackStatus.LOGIN && handleAuthUserSuccess)
        handleAuthUserSuccess();
      if (callbackNo == AuthCallbackStatus.RESET && handleAuthResetSuccess)
        handleAuthResetSuccess();
      if (callbackNo == AuthCallbackStatus.FORGOT && handleAuthForgotSuccess)
        handleAuthForgotSuccess();
    }
  }, [authState]);

  const onLogin = (identifier: string, password: string) => {
    setCallbackNo(AuthCallbackStatus.LOGIN);
    dispatch(authorize({ identifier, password }));
  };

  const onForgotPassword = (email: string) => {
    setCallbackNo(AuthCallbackStatus.FORGOT);
    dispatch(forgotPassword({ email }));
  };

  const onResetPassword = (token: string, password: string) => {
    setCallbackNo(AuthCallbackStatus.RESET);
    dispatch(resetPassword({ token, password }));
  };
  return {
    isAuthenticated: authState.accessToken ? true : false,
    accessToken: authState.accessToken,
    onLogin,
    onForgotPassword,
    onResetPassword,
    onLogout: () => {
      dispatch(logout());
      router.push('/');
    },
  };
};
