import { AwardStatus } from '@/constants/Enum';
import { UserLocation } from './point.type';
import { ProductType } from './product.type';
import { UserType } from './users.type';

export type CreateAwardParam = {
  input: AwardType;
};

export type GetAwardsParam = {
  filterBy: {
    userId?: number;
    location?: number;
    status?: AwardStatus;
    search?: string;
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
  product?: ProductType;
  assigneeId: number;
  assignee?: UserType.User;
  status: AwardStatus;
  note: string;
  createdAt?: string;
  updatedAt?: string;
};
