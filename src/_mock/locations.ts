import { Location } from '@/types';

export const initLocationData: Location.Data = {
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
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};

export const locationStatus = [
  { id: 'OPEN', value: 'Open' },
  { id: 'CLOSED', value: 'Close' },
];

export const locationType = [
  { id: 'PALM', value: 'PALM' },
  { id: 'ROULETTE', value: 'ROULETTE' },
];
