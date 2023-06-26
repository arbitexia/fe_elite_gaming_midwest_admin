import { MenuItemObj } from '@/types';
import {
  Person,
  LocationOn,
  Storefront,
  Work,
  RequestPage,
  Report,
  Comment,
  Analytics,
  Settings,
  Devices,
  Campaign,
} from '@mui/icons-material';

export const languageMenuItems = [
  { icon: 'images/icons/en.svg', key: 'en', text: 'English' },
  { icon: 'images/icons/es.svg', key: 'es', text: 'Español' },
];

export const superSidebarItems: MenuItemObj[] = [
  {
    id: 1,
    text: 'Users',
    isSelected: false,
    icon: <Person sx={{ marginRight: 2, width: 20 }} />,
    dropdown: [
      {
        text: 'Customers',
        route: 'users/customers',
        isSelected: false,
      },
      {
        text: 'Admins',
        route: 'users/admins',
        isSelected: false,
      },
      {
        text: 'Invitations',
        route: 'users/invitations',
        disabled: true,
        isSelected: false,
      },
    ],
  },
  {
    id: 2,
    text: 'Locations',
    route: 'locations',
    isSelected: false,
    icon: <LocationOn sx={{ marginRight: 2, width: 18 }} />,
  },
  {
    id: 3,
    text: 'Tablets',
    route: 'tablets',
    isSelected: false,
    icon: <Devices sx={{ marginRight: 2, width: 18 }} />,
  },
  {
    id: 4,
    text: 'Inventory',
    route: 'products',
    isSelected: false,
    icon: <Storefront sx={{ marginRight: 2, width: 18 }} />,
  },
  {
    id: 5,
    text: 'Rewards',
    route: 'rewards',
    isSelected: false,
    icon: <Work sx={{ marginRight: 2, width: 18 }} />,
  },
  {
    id: 6,
    text: 'Request',
    route: 'requests',
    isSelected: false,
    icon: <RequestPage sx={{ marginRight: 2, width: 18 }} />,
  },

  {
    id: 7,
    text: 'Reports',
    isSelected: false,
    icon: <Report sx={{ marginRight: 2, width: 18 }} />,
    dropdown: [
      {
        text: 'Activities',
        route: 'activity',
        isSelected: false,
      },
      {
        text: 'Transactions',
        route: 'transactions',
        isSelected: false,
      },
    ],
  },
  {
    id: 8,
    text: 'Comments',
    route: 'comments',
    isSelected: false,
    icon: <Comment sx={{ marginRight: 2, width: 18 }} />,
    disabled: true,
  },
  {
    id: 9,
    text: 'Analytics',
    isSelected: false,
    icon: <Analytics sx={{ marginRight: 2, width: 18 }} />,
    route: 'analytics',
    disabled: true,
  },
  {
    id: 10,
    text: 'Campaigns',
    isSelected: false,
    icon: <Campaign sx={{ marginRight: 2, width: 18 }} />,
    route: 'campaigns',
    disabled: false,
  },
  {
    id: 11,
    text: 'Site Settings',
    disabled: false,
    isSelected: false,
    icon: <Settings sx={{ marginRight: 2, width: 18 }} />,
    dropdown: [
      {
        text: 'Config',
        route: 'config',
        isSelected: false,
      },
      {
        text: 'Email Template',
        route: 'email_templates',
        isSelected: false,
      },
    ],
  },
];

export const adminSidebarItems: MenuItemObj[] = [
  {
    id: 1,
    text: 'Users',
    isSelected: false,
    icon: <Person sx={{ marginRight: 2, width: 20 }} />,
    dropdown: [
      {
        text: 'Customers',
        route: 'users/customers',
        isSelected: false,
      },
    ],
  },
  {
    id: 2,
    text: 'Inventory',
    route: 'products',
    isSelected: false,
    icon: <Storefront sx={{ marginRight: 2, width: 18 }} />,
  },
  {
    id: 3,
    text: 'Rewards',
    route: 'rewards',
    isSelected: false,
    icon: <Work sx={{ marginRight: 2, width: 18 }} />,
  },
  {
    id: 4,
    text: 'Request',
    route: 'requests',
    isSelected: false,
    icon: <RequestPage sx={{ marginRight: 2, width: 18 }} />,
  },

  {
    id: 5,
    text: 'Transactions',
    route: 'transactions',
    isSelected: false,
    icon: <Report sx={{ marginRight: 2, width: 18 }} />,
  },
];
