import { LocationType } from './location.type';
import { RewardItemType } from './rewards.type';
import { UserType } from './users.type';

export type RequestItemType = {
  id: number;
  item: RewardItemType;
  user: UserType.MockUser;
  location: LocationType;
  status: string;
  requestedAt: string;
};
