import { UserType, Location, RewardItemType, RequestItemType } from '@/types';
import { ActivityModel, ActivityType } from '@/constants';

export type ActivityItemType = {
  id: number;
  user: UserType.MockUser;
  model: ActivityModel;
  victim: Location | RewardItemType | RequestItemType;
  action: ActivityType;
  status: string;
  createdAt: string;
};
