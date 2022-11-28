import { MenuItemObj } from '@/types';

export const languageMenuItems = [
  { icon: 'images/icons/en.svg', key: 'en', text: 'English' },
  { icon: 'images/icons/es.svg', key: 'es', text: 'Español' },
];

export const superSidebarItems: MenuItemObj[] = [
  {
    id: 1,
    text: 'Analytics',
    isSelected: false,
    route: '/analytics',
    disabled: true,
  },
  {
    id: 2,
    text: 'Users',
    isSelected: false,
    disabled: false,
    dropdown: [
      {
        text: 'Customers',
        route: '/users/customers',
        isSelected: false,
      },
      {
        text: 'Tablets',
        route: '/users/tablets',
        isSelected: false,
      },
      {
        text: 'Admins',
        route: '/users/admins',
        isSelected: false,
      },
      {
        text: 'Invitations',
        route: '/users/invitations',
        isSelected: false,
      },
    ],
  },
  {
    id: 3,
    text: 'Locations',
    route: '/locations',
    isSelected: false,
  },
  {
    id: 4,
    text: 'Rewards',
    route: '/rewards',
    isSelected: false,
    disabled: false,
  },
  {
    id: 5,
    text: 'Request',
    route: '/requests',
    isSelected: false,
    disabled: false,
  },
  {
    id: 6,
    text: 'Comments',
    route: '/comments',
    isSelected: false,
    disabled: true,
  },
  {
    id: 7,
    text: 'Reports',
    disabled: true,
    isSelected: false,
    dropdown: [
      {
        text: 'Activity',
        route: '/activity',
        isSelected: false,
      },
      {
        text: 'Transaction',
        route: '/transaction',
        isSelected: false,
      },
    ],
  },
  {
    id: 8,
    text: 'Site Settings',
    route: '/settings',
    disabled: true,
    isSelected: false,
  },
];
