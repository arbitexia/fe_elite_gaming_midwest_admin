import { PaletteMode } from '@mui/material';
import { ResponseStatus } from '@/constants';
import { AssetType } from './asset.type';
import { CommonType } from './common.type';
import { UserType } from './users.type';
import { Location } from './location.type';
import { PointType } from './point.type';
import { AwardType } from './award.type';
import { Product } from './product.type';
import { Reward } from './reward.type';
import { ActivityItemType } from './activity.type';
import { ConfigType } from './config.type';
import { TabletType } from './tablet.type';
import { TransactionType } from './transaction.type';
import { EmailTemplateType } from './emailTemplate.type';
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
    locations: Location.Data[];
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
    products: Product.Data[];
    pageInfo: CommonType.PageInfo | null;
    currentId: number;
    currentProduct: Product.Data | null;
    message: string | null;
    error: string | null;
  };

  export type RewardState = {
    loading: boolean;
    status: ResponseStatus | null;
    message: string | null;
    error: string | null;
    rewards: Reward.DataList[];
    availableRewards: Reward.Data[];
    pageInfo: CommonType.PageInfo | null;
  };

  export type ActivityState = {
    loading: boolean;
    status: ResponseStatus | null;
    message: string | null;
    error: string | null;
    activities: ActivityItemType[];
    pageInfo: CommonType.PageInfo | null;
  };

  export type ConfigState = {
    loading: boolean;
    status: ResponseStatus | null;
    configItem: ConfigType;
    message: string | null;
    error: string | null;
  };

  export type TabletState = {
    loading: boolean;
    status: ResponseStatus | null;
    tablets: TabletType.Data[];
    pageInfo: CommonType.PageInfo | null;
    message: string | null;
    error: string | null;
  };

  export type TransactionState = {
    loading: boolean;
    status: ResponseStatus | null;
    message: string | null;
    error: string | null;
    transactions: TransactionType.Data[];
    pageInfo: CommonType.PageInfo | null;
  };

  export type EmailTemplateState = {
    loading: boolean;
    status: ResponseStatus | null;
    message: string | null;
    error: string | null;
    emailTemplates: EmailTemplateType.Data[];
    pageInfo: CommonType.PageInfo | null;
  };
}
