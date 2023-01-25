import { AssetType } from './asset.type';
import { CommonType } from './common.type';

export type LocationType = {
  id: number;
  name: string;
  coordinates: { lat: number; lng: number };
  address: CommonType.Address;
  status: boolean;
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
