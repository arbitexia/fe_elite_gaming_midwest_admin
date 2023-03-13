import { Location, Product } from '@/types';

export declare namespace Reward {
  type Data = {
    id: number;
    location: Location;
    product: Product;
    createdAt?: string;
    updatedAt?: string;
  };

  type Param = { id: number };

  type Body = {
    input: { locationId: number; productId: number }[];
  };

  type Filter = {
    condition: { locationId?: number; search: string };
  };
}
