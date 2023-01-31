import { LocationType } from './location.type';
import { UserType } from './users.type';

export type UserLocation = {
  id: number;
  userId: number;
  user?: UserType.User;
  locationId: number;
  location?: LocationType;
  createdAt?: string;
  updatedAt?: string;
};

export type PointType = {
  id: number;
  userLocationId: number;
  userLocation?: UserLocation;
  point: number;
  createdAt?: string;
  updatedAt?: string;
};

export type GetPointParam = {
  userId: number;
  locationId?: number;
};
