import { UserType, Location, Reward, RequestItemType } from '@/types';
import { ActivityModel, ActivityType } from '@/constants';

export type ActivityItemType = {
  id: number;
  user: UserType.MockUser;
  model: ActivityModel;
  victim: Location.Data | Reward.Data | RequestItemType;
  action: ActivityType;
  status: string;
  createdAt: string;
};
