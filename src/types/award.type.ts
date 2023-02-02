import { UserType } from './users.type';

export type CreateAwardParam = {
  input: AwardType;
};

export type GetAwardsParam = {
  filterBy: {
    location: number;
    search: string;
  };
  cursor: {
    page: number;
    size: number;
  };
};

export type ProductType = {
  id: number;
};

export enum AwardStatus {
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
  WAITING = 'WAITING',
}

export type AwardType = {
  id: number;
  userLocationId: number;
  userLocation?: Location;
  productId: number;
  product?: ProductType;
  assigneeId: number;
  assignee?: UserType.User;
  status: AwardStatus;
  note: string;
  createdAt?: string;
  updatedAt?: string;
};
