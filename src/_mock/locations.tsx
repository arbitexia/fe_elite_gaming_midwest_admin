import { LocationType } from '@/types';

export const initLocationData: LocationType = {
  name: '',
  coords: { lat: 0, lng: 0 },
  id: 0,
  address: {
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
  },
  status: '',
  type: '',
  description: '',
};

export const locationStatus = [
  { id: 'OPEN', value: 'Open' },
  { id: 'CLOSED', value: 'Close' },
];

export const locationType = [
  { id: 'PALM', value: 'PALM' },
  { id: 'ROULETTE', value: 'ROULETTE' },
];
