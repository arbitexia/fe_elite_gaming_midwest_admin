import { LocationType } from './Location';
import { RewardItemType } from './Rewards';
import { UserType } from './Users';

export type RequestItemType = {
  id: number;
  item: RewardItemType;
  user: UserType;
  location: LocationType;
  status: string;
  requestedAt: string;
};
