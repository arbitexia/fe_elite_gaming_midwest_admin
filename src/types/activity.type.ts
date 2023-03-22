import { UserType, Location, Reward, RequestItemType } from '@/types';
import { ActivityModel, ActivityType } from '@/constants';

export type ActivityItemType = {
  id: number;
  user: UserType.User;
  model: ActivityModel;
  victimId: number;
  metadata: { status: string };
  type: ActivityType;
  createdAt: string;
};

export type ExportActivityType = {
  id: number;
  user: string;
  model: string;
  victimId: number;
  metadata: string;
  type: string;
  date: string;
};

export type ActivityFilterType = {
  filterBy: {
    modelType: string;
    search?: string;
    sort?: string;
  };
  cursor: {
    page: number;
    size: number;
  };
};
