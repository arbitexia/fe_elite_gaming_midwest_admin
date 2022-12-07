import { LocationType } from './Location';

export interface RewardsDetailProps {
  rewardsItem: RewardItemType;
}

export type RewardItemType = {
  id: number;
  name: string;
  urls: string[];
  location: LocationType;
  point: number;
  description: string;
  specifications: object;
  status: string;
  amount: number;
  createdAt: string;
};
