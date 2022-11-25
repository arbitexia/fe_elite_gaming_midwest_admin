import { RequestItemType } from '@/types';

export const requestsData: RequestItemType[] = [
  {
    id: 1,
    item: { name: 'iphone14', point: 3000, price: 800, color: 'Silver/Black' },
    user: { name: 'david', phone: '123456789' },
    location: 'Mariland, USA',
    status: 'Pending',
    requestedAt: '14/06/2022',
  },
  {
    id: 2,
    item: { name: 'Galaxy 8', point: 5000, price: 600, color: 'Silver/Black' },
    user: { name: 'alex', phone: '1234567890' },
    location: 'Mariland, USA',
    status: 'Pending',
    requestedAt: '14/06/2022',
  },
];
