import { CampaignType } from '@/types';

export const initCampaignData: CampaignType.Data[] = [
  {
    id: 1,
    name: 'Birthday',
    status: 1,
    type: 'BIRTHDAY',
    offer: 20,
    total: 58,
    redeemed: 25,
    startDate: '7/1/2023',
    endDate: '9/1/2023',
  },
  {
    id: 2,
    name: 'New Member',
    status: 0,
    type: 'WELCOME',
    offer: 5,
    total: 21,
    redeemed: 12,
    startDate: '7/1/2023',
    endDate: '9/1/2023',
  },
];

export const initCampaignOnDemand: CampaignType.Data[] = [];
export const initCampaignInformational: CampaignType.Data[] = [
  {
    id: 1,
    name: 'Communication Jun162023',
    status: 1,
    type: 'NEWSLWTTER',
    offer: 0,
    total: 0,
    redeemed: 0,
    startDate: '7/1/2023',
    endDate: '9/1/2023',
  },
];
