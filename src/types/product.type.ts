import { AssetType } from './asset.type';
import { LocationType } from './location.type';

export enum ProductStatus {
  AVAILABLE = 'AVAILABLE',
  DISABLED = 'DISABLED',
  OUTOFSTOCK = 'OUTOFSTOCK',
}

export type ProductType = {
  id: number;
  name: string;
  locationId: number;
  location?: LocationType;
  gallery?: AssetType.Gallery[];
  status: ProductStatus;
  amount: number;
  point: number;
  short: string;
  urls: string[];
  description: string;
  createdAt?: string;
  updatedAt?: string;
};

export type GetProductsParam = {
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
