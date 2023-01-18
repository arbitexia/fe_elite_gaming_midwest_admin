import { CommonType } from './common.type';

export type LocationType = {
  name: string;
  coordinates: { lat: number; lng: number };
  id: number;
  location: CommonType.Address;
  status: boolean;
  type: string;
  urls: string[];
};

export interface LocationsDetailProps {
  locationItem: LocationType;
}
