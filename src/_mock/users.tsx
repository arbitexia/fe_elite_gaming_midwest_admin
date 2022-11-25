import { UserType } from '@/types';
import { MenuAction } from '@/constants/Enum';

export const menuActions = [
  { label: 'View more', color: '#28B446', action: MenuAction.VIEW },
  { label: 'Edit', color: '#667180', action: MenuAction.EDIT },
  { label: 'Delete', color: 'rgba(251, 2, 2, 0.6)', action: MenuAction.DELETE },
];

export const usersTableData: UserType[] = [
  {
    id: 1,
    name: 'Esthera Jackson',
    email: 'alecthompson@mail.com',
    phonenumber: '+14898903328',
    birthday: '14/06/1991',
    role: 4,
    status: 1,
    createdAt: '17/09/2021',
    asset: '',
    location: '96607 Claire Square Suite 591 - St. Louis Park, HI / 40802',
  },
  {
    id: 2,
    name: 'Alexa Liras',
    email: 'alexa@gmail.com',
    phonenumber: '+14898903328',
    birthday: '12/06/1971',
    role: 4,
    status: 1,
    createdAt: '16/09/2021',
    asset: '',
    location: '96607 Claire Square Suite 591 - St. Louis Park, HI / 40802',
  },
  {
    id: 3,
    name: 'Laurent Michael',
    email: 'laurentamachael@gmail.com',
    phonenumber: '+14898903328',
    birthday: '11/06/1999',
    role: 4,
    status: 1,
    createdAt: '15/09/2021',
    asset: '',
    location: '96607 Claire Square Suite 591 - St. Louis Park, HI / 40802',
  },
  {
    id: 4,
    name: 'Esthera Jackson',
    email: 'alecthompson@mail.com',
    phonenumber: '+14898903328',
    birthday: '14/06/1991',
    role: 4,
    status: 2,
    createdAt: '17/09/2021',
    asset: '',
    location: '96607 Claire Square Suite 591 - St. Louis Park, HI / 40802',
  },
  {
    id: 5,
    name: 'Alexa Liras',
    email: 'alexa@gmail.com',
    phonenumber: '+14898903328',
    birthday: '12/06/1971',
    role: 4,
    status: 2,
    createdAt: '16/09/2021',
    asset: '',
    location: '96607 Claire Square Suite 591 - St. Louis Park, HI / 40802',
  },
  {
    id: 6,
    name: 'Laurent Michael',
    email: 'laurentamachael@gmail.com',
    phonenumber: '+14898903328',
    birthday: '11/06/1999',
    role: 4,
    status: 3,
    createdAt: '15/09/2021',
    asset: '',
    location: '96607 Claire Square Suite 591 - St. Louis Park, HI / 40802',
  },
  {
    id: 7,
    name: 'Esthera Jackson',
    email: 'alecthompson@mail.com',
    phonenumber: '+14898903328',
    birthday: '14/06/1991',
    role: 4,
    status: 3,
    createdAt: '17/09/2021',
    asset: '',
    location: '96607 Claire Square Suite 591 - St. Louis Park, HI / 40802',
  },
  {
    id: 8,
    name: 'Alexa Liras',
    email: 'alexa@gmail.com',
    phonenumber: '+14898903328',
    birthday: '12/06/1971',
    role: 4,
    status: 1,
    createdAt: '16/09/2021',
    asset: '',
    location: '96607 Claire Square Suite 591 - St. Louis Park, HI / 40802',
  },
  {
    id: 9,
    name: 'Laurent Michael',
    email: 'laurentamachael@gmail.com',
    phonenumber: '+14898903328',
    birthday: '11/06/1999',
    role: 4,
    status: 4,
    createdAt: '15/09/2021',
    asset: '',
    location: '96607 Claire Square Suite 591 - St. Louis Park, HI / 40802',
  },
];

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

export const userRole = [
  { id: 1, value: 'Super Admin' },
  { id: 2, value: 'Administrator' },
  { id: 3, value: 'Tablet' },
  { id: 4, value: 'Customer' },
];
export const userStatus = [
  { id: 1, value: 'Activated' },
  { id: 2, value: 'Archived' },
  { id: 3, value: 'Disabled' },
  { id: 4, value: 'Pending' },
];
