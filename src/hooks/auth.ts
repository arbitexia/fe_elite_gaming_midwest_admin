import { authSelector, setAuthState } from '@/redux/slices';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from './redux';

export const useAuth = () => {
  const router = useRouter();
  const authState = useAppSelector(authSelector);
  const dispatch = useAppDispatch();

  const onLogin = (authToken: string) => {
    dispatch(setAuthState(authToken));
    router.push('/');
  };

  return {
    isAuthenticated: authState.authToken ? true : false,
    authToken: authState.authToken,
    onLogin,
    onLogout: () => {
      dispatch(setAuthState(''));
      router.push('/login');
    },
  };
};
