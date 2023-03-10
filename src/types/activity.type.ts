import {
  UserType,
  LocationType,
  RewardItemType,
  RequestItemType,
} from '@/types';
import { ActivityModel, ActivityType } from '@/constants';

export type ActivityItemType = {
  id: number;
  user: UserType.MockUser;
  model: ActivityModel;
  victim: LocationType | RewardItemType | RequestItemType;
  action: ActivityType;
  status: string;
  createdAt: string;
};
