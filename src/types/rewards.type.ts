import { LocationType } from './location.type';
import { Product } from './product.type';

export interface RewardsDetailProps {
  rewardsItem: Product;
}

export type RewardItemType = {
  id: number;
  name: string;
  urls: string[];
  locationId: number;
  location: LocationType;
  point: number;
  description: string;
  short: string;
  status: string;
  amount: number;
  createdAt: string;
};
