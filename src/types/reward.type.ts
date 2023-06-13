import { Location, Product } from '@/types';

export declare namespace Reward {
  type Data = {
    id?: number;
    locationId?: number;
    productId?: number;
    location?: Location.Data;
    product?: Product.Data;
    point?: number;
    coupon?: number;
    pointThreshold?: number;
    couponThreshold?: number;
    createdAt?: string;
    updatedAt?: string;
  };

  type DataList = Location.Data & {
    reward: Reward.Data & { product: Product.Data }[];
  };

  type Param = { id: number };

  type Body = {
    input: { locationId: number; productId: number }[];
  };

  type Filter = {
    filterBy: {
      locationId?: number;
      search: string;
    };
    cursor: {
      page: number;
      size: number;
    };
  };
}
