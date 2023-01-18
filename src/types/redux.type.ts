import { PaletteMode } from '@mui/material';
import { ResponseStatus, CommonType } from './common.type';
import { UserType } from './users.type';

export declare namespace ReduxJson {
  export type CommonReduxData<T> = {
    loading: boolean;
    data: T | null;
    status: ResponseStatus | null;
  };

  export type AppState = {
    theme: {
      mode: PaletteMode;
      loading: boolean;
    };
  };

  export type AuthState = {
    loading: boolean;
    status: ResponseStatus | null;
    accessToken: string;
    refreshToken: string;
    user: object | null;
    role: object;
    message: string | null;
    error: string | null;
  };

  export type UserState = {
    loading: boolean;
    status: ResponseStatus | null;
    users: UserType.User[];
    pageInfo: CommonType.PageInfo | null;
    currentId: number;
    currentUser: UserType.User | null;
    message: string | null;
    error: string | null;
  };
}
