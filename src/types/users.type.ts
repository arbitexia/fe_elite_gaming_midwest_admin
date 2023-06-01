import { UserStatus } from '@/constants/enum';
import { AssetType } from './asset.type';
import { CommonType } from './common.type';
import { RoleType } from './role.type';
import { Location } from './location.type';

export declare namespace UserType {
  type User = {
    id: number;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    userName?: string;
    avatar?: AssetType.Asset;
    assetId?: number;
    email?: string;
    phone: string;
    address?: CommonType.Address;
    birthday: string;
    status?: UserStatus;
    role?: RoleType.Role;
    roleId?: number;
    firstLogin?: object;
    locationId?: number;
    userLocations?: UserLocationsType[];
    coupon?: number;
    createdAt?: string;
    updatedAt?: string;
  };

  type MockUser = {
    id: number;
    firstName?: string;
    lastName?: string;
    userName?: string;
    asset?: string;
    email?: string;
    phone: string;
    address?: CommonType.Address;
    birthday: string;
    status: number;
    role: number;
    createdAt?: string;
    updatedAt?: string;
  };
  type ChangePasswordParam = {
    userId?: number;
    oldPassword: string;
    password: string;
  };
}

export type GetUsersParam = {
  filterBy: {
    type: string;
    status: string;
    search: string;
    location: string;
  };
  cursor: {
    page: number;
    size: number;
  };
};

export type GetUserParam = {
  userId: number;
};

export type UpdateUserParam = {
  userId: number;
  input: UserType.User;
  uploadPhoto?: File;
};

export type UserLocationsType = {
  id: number;
  userId: number;
  locationId: number;
  createdAt: string;
  updatedAt: string;
  user?: UserType.User;
  location?: Location.Data;
};

export type UserLocationFilter = {
  filterBy: {
    locationId: number;
  };
  cursor: {
    page: number;
    size: number;
  };
};

export type DeleteUserParam = {
  userId: number;
};
