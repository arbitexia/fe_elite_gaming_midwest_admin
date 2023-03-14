import { Location } from './location.type';
import { Reward } from './reward.type';
import { UserType } from './users.type';

export type RequestItemType = {
  id: number;
  item: Reward.Data;
  user: UserType.MockUser;
  location: Location.Data;
  status: string;
  requestedAt: string;
};
