import { LocationType } from './location.type';
import { ProductType, ProductStatus } from './product.type';

export interface RewardsDetailProps {
  rewardsItem: ProductType;
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
  status: ProductStatus;
  amount: number;
  createdAt: string;
};
