import { AssetType } from './asset.type';
import { CommonType } from './common.type';

export type LocationType = {
  id: number;
  name: string;
  coords: { lat: number; lng: number };
  address: CommonType.Address;
  fullAddress?: string;
  status: string;
  type: string;
  description?: string;
  gallery?: AssetType.Gallery[];
};

export interface LocationsDetailProps {
  locationItem: LocationType;
}

export type GetLocationsParam = {
  filterBy: {
    search: string;
  };
  // cursor: {
  //   page: number;
  //   size: number;
  // };
};

export type GetLocationParam = {
  locationId: number;
};

export type LocationInputParam = {
  name: string;
  coords: { lat: number; lng: number };
  address: CommonType.Address;
  description: string;
  status: string;
  type: string;
};

export type CreateLocationParam = {
  input: LocationInputParam;
};

export type UpdateLocationParam = {
  id: number;
  input: LocationInputParam;
};

export type DeleteLocationParam = {
  locationId: number;
};
