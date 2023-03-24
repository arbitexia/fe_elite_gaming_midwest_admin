import { AssetType } from './asset.type';

export declare namespace Product {
  type Data = {
    id: number;
    name: string;
    amount: number;
    point: number;
    status: string;
    short: string;
    description: string;
    gallery?: AssetType.Gallery[];
    createdAt?: string;
    updatedAt?: string;
  };

  type Param = { id: number };

  type Body = {
    input: {
      name?: string;
      amount?: number;
      point?: number;
      status?: string;
      short?: string;
      description?: string;
    };
  };

  type Filter = {
    filterBy: {
      pointFrom?: number;
      pointTo?: number;
      search: string;
      sort?: string;
    };
    cursor: {
      page: number;
      size: number;
    };
  };
}
