import {
  UserType,
  LocationType,
  RewardItemType,
  RequestItemType,
} from '@/types';
import { ActivityModel, ActivityType } from '@/constants/Enum';

export type AcitivityItemType = {
  id: number;
  user: UserType;
  model: ActivityModel;
  victim: LocationType | RewardItemType | RequestItemType;
  action: ActivityType;
  status: string;
};
