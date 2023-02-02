import { LocationType } from './location.type';
import { ProductType } from './product.type';

export interface RewardsDetailProps {
  rewardsItem: ProductType;
}

export type RewardItemType = {
  id: number;
  name: string;
  urls: string[];
  location: LocationType;
  point: number;
  description: string;
  short: string;
  status: string;
  amount: number;
  createdAt: string;
};
