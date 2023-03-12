import { PaletteMode } from '@mui/material';
import { ResponseStatus } from '@/constants';
import { AssetType } from './asset.type';
import { CommonType } from './common.type';
import { UserType } from './users.type';
import { LocationType } from './location.type';
import { PointType } from './point.type';
import { AwardType } from './award.type';
import { Product } from './product.type';
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

  export type AwardState = {
    loading: boolean;
    status: ResponseStatus | null;
    message: string | null;
    error: string | null;
    awards: AwardType[];
    pageInfo: CommonType.PageInfo | null;
  };

  export type AssetState = {
    loading: boolean;
    status: ResponseStatus | null;
    message: string | null;
    error: string | null;
    galleries: AssetType.Gallery[];
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

  export type LocationState = {
    loading: boolean;
    status: ResponseStatus | null;
    locations: LocationType[];
    pageInfo: CommonType.PageInfo | null;
    message: string | null;
    error: string | null;
  };

  export type PointState = {
    loading: boolean;
    status: ResponseStatus | null;
    points: PointType[];
    message: string | null;
    error: string | null;
  };

  export type ProductState = {
    loading: boolean;
    status: ResponseStatus | null;
    products: Product[];
    pageInfo: CommonType.PageInfo | null;
    currentId: number;
    currentProduct: Product | null;
    message: string | null;
    error: string | null;
  };

  export type RewardState = {
    loading: boolean;
    status: ResponseStatus | null;
    message: string | null;
    error: string | null;
    locationId: number;
    products: Product[];
  };
}
