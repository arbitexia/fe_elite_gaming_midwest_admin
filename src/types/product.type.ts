import { AssetType } from './asset.type';

export type Product = {
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

export type CreateProductParam = {
  input: {
    name: string;
    amount: number;
    point: number;
    status: string;
    short: string;
    description: string;
  };
};

export type FilterProductsParam = {
  filterBy: {
    product: number;
    pointFrom: number;
    pointTo: number;
    search: string;
  };
  cursor: {
    page: number;
    size: number;
  };
};

export type GetProductParam = {
  id: number;
};

export type UpdateProductParam = {
  id: number;
  input: {
    name: string;
    amount: number;
    point: number;
    status: string;
    short: string;
    description: string;
  };
};

export type DeleteProductParam = {
  productId: number;
};
