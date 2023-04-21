import { UserType } from '@/types';
import { ActivityModel, ActivityType } from '@/constants';

export type ActivityItemType = {
  id: number;
  user: UserType.User;
  model: ActivityModel;
  victimId: number;
  attributes: { status: string; description: string; body?: object };
  type: ActivityType;
  createdAt: string;
};

export type ExportActivityType = {
  id: number;
  user: string;
  model: string;
  status: string;
  description: string;
  body?: string;
  type: string;
  date: string;
};

export type ActivityFilterType = {
  filterBy: {
    modelType?: string;
    search?: string;
    sort?: string;
    userId?: number;
  };
  cursor: {
    page: number;
    size: number;
  };
};
