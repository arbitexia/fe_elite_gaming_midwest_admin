import { Location } from './location.type';
import { RewardItemType } from './rewards.type';
import { UserType } from './users.type';

export type RequestItemType = {
  id: number;
  item: RewardItemType;
  user: UserType.MockUser;
  location: Location;
  status: string;
  requestedAt: string;
};
