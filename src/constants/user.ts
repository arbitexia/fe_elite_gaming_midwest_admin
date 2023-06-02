import { MenuAction, UserRole } from '@/constants';

export const menuActions = [
  { label: 'View more', color: '#28B446', action: MenuAction.VIEW },
  { label: 'Edit', color: '#667180', action: MenuAction.EDIT },
  { label: 'Delete', color: '#fb020299', action: MenuAction.DELETE },
];

export const menuCustomerActions = [
  { label: 'View more', color: '#28B446', action: MenuAction.VIEW },
  { label: 'Edit', color: '#667180', action: MenuAction.EDIT },
  { label: 'Follow up', color: '#667180', action: MenuAction.FOLLOWUP_EMAIL },
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

export const userRole = [
  { id: 1, value: UserRole.GUEST },
  { id: 2, value: UserRole.CUSTOMER },
  { id: 4, value: UserRole.ADMIN },
  { id: 5, value: UserRole.SUPER },
];
