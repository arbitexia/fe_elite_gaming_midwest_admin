import { UserType } from '@/types';
import { MenuAction } from '@/constants/Enum';

export const menuActions = [
  { label: 'View more', color: '#28B446', action: MenuAction.VIEW },
  { label: 'Edit', color: '#667180', action: MenuAction.EDIT },
  { label: 'Delete', color: 'rgba(251, 2, 2, 0.6)', action: MenuAction.DELETE },
];

export const profileData: UserType.User = {
  id: 1,
  firstName: 'Esthera',
  lastName: 'Jackson',
  email: 'alecthompson@mail.com',
  phone: '+14898903328',
  birthday: '14/06/1991',
  createdAt: '17/09/2021',
  assetId: 1,
  location: {
    address1: '96607 Claire Square Suite',
    address2: 'St. Louis Park, HI',
    city: 'New York',
    state: '',
    country: 'USA',
    zipcode: '48021',
  },
};

export const userRequestData = [
  {
    id: 1,
    rewardName: 'iPhone 5',
    location: 'Roulette Casino Resort',
    point: '15000',
    status: 'Pending',
    createdAt: '17/09/2021',
  },
  {
    id: 2,
    rewardName: 'iPhone 5',
    location: 'Roulette Casino Resort',
    point: '15000',
    status: 'Pending',
    createdAt: '17/09/2021',
  },
  {
    id: 3,
    rewardName: 'iPhone 5',
    location: 'Roulette Casino Resort',
    point: '15000',
    status: 'Pending',
    createdAt: '17/09/2021',
  },
  {
    id: 4,
    rewardName: 'iPhone 5',
    location: 'Roulette Casino Resort',
    point: '15000',
    status: 'Pending',
    createdAt: '17/09/2021',
  },
];

export const userPointsData = [
  {
    id: 1,
    point: '25000',
    location: 'Roulette Casino Resort',
    updatedAt: '14/06/2021',
  },
  {
    id: 2,
    point: '35000',
    location: 'Palm Casino Resort',
    updatedAt: '14/06/2021',
  },
  {
    id: 3,
    point: '45000',
    location: 'Roulette Casino Resort',
    updatedAt: '14/06/2021',
  },
  {
    id: 4,
    point: '55000',
    location: 'Palm Casino Resort',
    updatedAt: '14/06/2021',
  },
  {
    id: 5,
    point: '65000',
    location: 'Roulette Casino Resort',
    updatedAt: '14/06/2021',
  },
];

export const userTransactionData = [
  {
    id: 1,
    amount: '1336.19',
    type: 'spend',
    createdAt: '15/12/2022',
  },
  {
    id: 2,
    amount: '1336.19',
    type: 'spend',
    createdAt: '8/12/2022',
  },
  {
    id: 3,
    amount: '22216.19',
    type: 'earn',
    createdAt: '7/12/2022',
  },
  {
    id: 4,
    amount: '316.19',
    type: 'spend',
    createdAt: '5/12/2022',
  },
  {
    id: 5,
    amount: '636.19',
    type: 'earn',
    createdAt: '3/12/2022',
  },
  {
    id: 6,
    amount: '536.19',
    type: 'spend',
    createdAt: '1/12/2022',
  },
];

export type GuestActivityDataType = {
  model: string;
  sentence: string;
};

export const guestActivityData: GuestActivityDataType[] = [
  { model: 'ORDER', sentence: 'New order #4219423' },
  { model: 'INVITATION', sentence: '$2400, Design changes' },
  {
    model: 'PAYMENT',
    sentence: 'New card added for order #3210145',
  },
  { model: 'ORDER', sentence: 'New order #4219424' },
  {
    model: 'PAYMENT',
    sentence: 'New card added for order #3210145',
  },
];

export const roleShortCodes = {
  admins: 'ADMIN',
  tablets: 'TABLET',
  customers: 'CUSTOMER',
};

export const userStatus = [
  { id: 'ACTIVATED', value: 'Activated' },
  { id: 'ARCHIVED', value: 'Archived' },
  { id: 'DISABLED', value: 'Disabled' },
];
