import { AssetType } from './asset.type';
import { LocationType } from './location.type';

export type CreateProductParam = {
  product: {
    name: string;
    locationId: number;
    amount: number;
    point: number;
    status: string;
    short: string;
    description: string;
  };
};

export type FilterProductsParam = {
  filterBy: {
    location: number;
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

export type Product = {
  id: number;
  name: string;
  locationId: number;
  location?: LocationType;
  urls?: string[];
  amount: number;
  point: number;
  status: string;
  short: string;
  description: string;
  gallery?: AssetType.Gallery[];
  createdAt?: string;
  updatedAt?: string;
};
