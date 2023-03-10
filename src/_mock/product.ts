import { Product } from '@/types';

export const productMockData: Product = {
  id: 0,
  name: 'AirPods 2',
  locationId: 0,
  location: {
    name: 'Palm Casino Resort',
    coords: { lat: 40.7127837, lng: -74.0059413 },
    id: 1,
    address: {
      address1: '',
      address2: '',
      city: '',
      state: 'New York',
      zipcode: '',
      country: 'USA',
    },
    status: 'OPEN',
    type: 'Palm',
  },
  amount: 3,
  point: 12000,
  status: 'AVAILABLE',
  short: '128gb RAM $600',
  description: '',
  createdAt: '14/06/2001',
};
