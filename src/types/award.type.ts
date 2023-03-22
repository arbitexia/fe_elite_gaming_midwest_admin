import { AwardStatus } from '../constants';
import { UserLocation } from './point.type';
import { Product } from './product.type';
import { UserType } from './users.type';

export type CreateAwardParam = {
  input: AwardType;
};

export type GetAwardsParam = {
  filterBy: {
    // location: number;
    search: string;
  };
  cursor: {
    page: number;
    size: number;
  };
};

export type AwardType = {
  id: number;
  userLocationId: number;
  userLocation?: UserLocation;
  productId: number;
  product?: Product.Data;
  assigneeId: number;
  assignee?: UserType.User;
  status: AwardStatus;
  note: string;
  createdAt?: string;
  updatedAt?: string;
};
