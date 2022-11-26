import { AddressType } from './Users';

export type LocationType = {
  name: string;
  coordinates: { lat: number; lng: number };
  id: number;
  location: AddressType;
  status: boolean;
  type: string;
  urls: string[];
};

export interface LocationsDetailProps {
  locationItem: LocationType;
}
