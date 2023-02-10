import { UserStatus } from '@/constants/Enum';
import { CommonType } from './common.type';
import { AssetType } from './asset.type';
import { RoleType } from './role.type';

export declare namespace UserType {
  type User = {
    id: number;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    userName?: string;
    password?: string;
    confirmPassword?: string;
    avatar?: AssetType.Asset;
    assetId?: number;
    email?: string;
    phone: string;
    location?: CommonType.Address;
    fullAddress?: string;
    birthday: string;
    status?: UserStatus;
    role?: RoleType.Role;
    roleId?: number;
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
}

export type GetUsersParam = {
  filterBy: {
    type: string;
    status: string;
    search: string;
  };
  cursor: {
    page: number;
    size: number;
  };
};

export type GetUserParam = {
  userId: number;
};

export type ChangePasswordParam = {
  userId: number;
  oldPassword: string;
  password: string;
};

export type UpdateUserParam = {
  userId: number;
  input: {
    firstName?: string;
    lastName?: string;
    userName?: string;
    assetId?: number;
    email?: string;
    phone?: string;
    location?: CommonType.Address;
    birthday?: string;
    status?: UserStatus;
    roleId?: number;
  };
};

export type DeleteUserParam = {
  userId: number;
};
