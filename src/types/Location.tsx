export type LocationType = {
  name: string;
  coordinates: { lat: number; lng: number };
  id: number;
  location: string;
  status: boolean;
  type: string;
  urls: string[];
};

export interface LocationsDetailProps {
  locationItem: LocationType;
}
