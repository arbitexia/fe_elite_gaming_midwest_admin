import {
  PersonAdd,
  Group,
  Cake,
  EmojiEvents,
  Mood,
  Article,
} from '@mui/icons-material';
import {
  CampaignModelEnum,
  CampaignStatusEnum,
  CampaignTypeEnum,
  CouponEnum,
  PointEnum,
} from './enum';

export const campaignNameIcons = [
  { id: 1, icon: <PersonAdd sx={{ width: 20 }} />, name: 'WELCOME' },
  { id: 2, icon: <Group sx={{ width: 20 }} />, name: 'REFERRAL' },
  { id: 3, icon: <Cake sx={{ width: 20 }} />, name: 'BIRTHDAY' },
  { id: 4, icon: <EmojiEvents sx={{ width: 20 }} />, name: 'REWARDS' },
  { id: 5, icon: <Mood sx={{ width: 20 }} />, name: 'APPRECIATION' },
  { id: 6, icon: <Article sx={{ width: 20 }} />, name: 'NEWSLETTER' },
];

export const campaignType = [
  { id: CampaignTypeEnum.BIRTHDAY, value: CampaignTypeEnum.BIRTHDAY },
  { id: CampaignTypeEnum.APPRECIATION, value: CampaignTypeEnum.APPRECIATION },
  { id: CampaignTypeEnum.REFERRAL, value: CampaignTypeEnum.REFERRAL },
  { id: CampaignTypeEnum.REWARDS, value: CampaignTypeEnum.REWARDS },
  { id: CampaignTypeEnum.WELCOME, value: CampaignTypeEnum.WELCOME },
  { id: CampaignTypeEnum.NEWSLETTER, value: CampaignTypeEnum.NEWSLETTER },
];

export const campaignModel = [
  { id: CampaignModelEnum.AUTO_PILOT, value: 'Auto Pilot' },
  { id: CampaignModelEnum.ON_DEMAND, value: 'On Demand' },
  { id: CampaignModelEnum.INFORMATIONAL, value: 'Informational' },
];

export const campaignOfferType = [
  { id: CouponEnum.COUPON, value: 'Coupon' },
  { id: PointEnum.POINT, value: 'Point' },
];

export const campaignStatus = [
  { id: CampaignStatusEnum.ENABLED, value: 'Enabled' },
  { id: CampaignStatusEnum.DISABLED, value: 'Disabled' },
];
