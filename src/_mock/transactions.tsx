import { TransactionType } from '@/types/transactions.type';

export const transactionData: TransactionType[] = [
  {
    id: 1,
    user: {
      id: 2,
      firstName: 'Alexa',
      lastName: 'Liras',
      email: 'alexa@gmail.com',
      phone: '+14898903328',
      birthday: '12/06/1971',
      role: 4,
      status: 1,
      createdAt: '16/09/2021',
      asset: '',
      address: {
        address1: '96607 Claire Square Suite',
        address2: 'St. Louis Park, HI',
        city: 'New York',
        state: '',
        country: 'USA',
        zipcode: '48021',
      },
    },
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
    reward: {
      id: 1,
      name: 'AirPods 2',
      urls: ['images/earphone.jpg'],
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
      point: 12000,
      short: '128gb RAM $600',
      description: '',
      amount: 3,
      status: 'Available',
      createdAt: '14/06/2022',
    },
    assignee: {
      id: 1,
      firstName: 'Esthera',
      lastName: 'Jackson',
      email: 'alecthompson@mail.com',
      phone: '+14898903328',
      birthday: '14/06/1991',
      role: 2,
      status: 1,
      createdAt: '17/09/2021',
      asset: '',
      address: {
        address1: '96607 Claire Square Suite',
        address2: 'St. Louis Park, HI',
        city: 'New York',
        state: '',
        country: 'USA',
        zipcode: '48021',
      },
    },
    type: 'Point',
    amount: 10000,
    status: 'Accepted',
    createdAt: '2022/11/21',
    updatedAt: '2022/11/23',
  },
];

export const transactionsType = [
  { id: 1, value: 'Coupon' },
  { id: 2, value: 'Point' },
];

export const transactionsStatus = [
  { id: 1, value: 'Accepted' },
  { id: 2, value: 'Declined' },
  { id: 3, value: 'Waiting' },
];
