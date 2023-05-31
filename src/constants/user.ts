import { MenuAction } from '@/constants';

export const menuActions = [
  { label: 'View more', color: '#28B446', action: MenuAction.VIEW },
  { label: 'Edit', color: '#667180', action: MenuAction.EDIT },
  { label: 'Delete', color: '#fb020299', action: MenuAction.DELETE },
];

export const menuCustomerActions = [
  { label: 'View more', color: '#28B446', action: MenuAction.VIEW },
  { label: 'Edit', color: '#667180', action: MenuAction.EDIT },
  { label: 'Send email', color: '#667180', action: MenuAction.SEND_EMAIL },
  { label: 'Delete', color: '#fb020299', action: MenuAction.DELETE },
];

export const menuTransactionActions = [
  { label: 'View more', color: '#28B446', action: MenuAction.VIEW },
  { label: 'Delete', color: '#fb020299', action: MenuAction.DELETE },
];

export const menuTabletActions = [
  {
    label: 'Change password',
    color: '#28B446',
    action: MenuAction.CHANGE_PASSWORD,
  },
  { label: 'Edit', color: '#667180', action: MenuAction.EDIT },
  { label: 'Delete', color: '#fb020299', action: MenuAction.DELETE },
];

export const menuRewardActions = [
  { label: 'Edit', color: '#667180', action: MenuAction.EDIT },
  { label: 'Delete', color: '#fb020299', action: MenuAction.DELETE },
];

export const menuActivityActions = [
  { label: 'Delete', color: '#fb020299', action: MenuAction.DELETE },
];

export const slugIndex = {
  admins: 'ADMIN',
  customers: 'CUSTOMER',
};

export const userStatus = [
  { id: 'ACTIVATED', value: 'Activated' },
  { id: 'DISABLED', value: 'Disabled' },
  { id: 'VERIFY_EMAIL', value: 'Verify Email' },
  { id: 'VERIFY_PHONE', value: 'Verify Phone' },
];
