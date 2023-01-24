import { CommonType } from './common.type';

export type LocationType = {
  name: string;
  coordinates: { lat: number; lng: number };
  id: number;
  address: CommonType.Address;
  status: boolean;
  type: string;
  urls: string[];
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
