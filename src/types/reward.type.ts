import { Location, Product } from '@/types';

export declare namespace Reward {
  type Data = {
    id: number;
    location: Location.Data;
    product: Product.Data;
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
    condition: { locationId?: number; search: string };
  };
}
