import { Typography, InputAdornment, Divider, Box } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import {
  UIFlexWrapBox,
  UIDefaultTextField,
  UIFlexCenterBox,
  UIDefaultButton,
  UIListHeader,
  UIFlexSpaceBox,
  UIFlexColumnBox,
  UIInfoValue,
  UIInfoTitle,
} from '@/components/UI';

interface CampaignOverviewProps {}

const CampaignOverview = ({}: CampaignOverviewProps) => {
  return (
    <UIFlexSpaceBox sx={{ my: 4 }}>
      <UIFlexColumnBox sx={{ width: '100%' }}>
        <UIInfoTitle sx={{ width: 'auto', color: '#7F7F7F', fontSize: '18px' }}>
          Campaigns
        </UIInfoTitle>
        <Typography sx={{ color: '#7F7F7F', fontSize: '24px' }}>31</Typography>
      </UIFlexColumnBox>
      <UIFlexColumnBox sx={{ width: '100%' }}>
        <UIInfoTitle sx={{ width: 'auto', color: '#D6C4AA', fontSize: '18px' }}>
          Offer issued
        </UIInfoTitle>
        <Typography sx={{ color: '#D6C4AA', fontSize: '24px' }}>155</Typography>
      </UIFlexColumnBox>
      <UIFlexColumnBox sx={{ width: '100%' }}>
        <UIInfoTitle sx={{ width: 'auto', color: '#D9D9D9', fontSize: '18px' }}>
          Offers Redeemed
        </UIInfoTitle>
        <Typography sx={{ color: '#D9D9D9', fontSize: '24px' }}>85</Typography>
      </UIFlexColumnBox>
      <UIFlexColumnBox sx={{ width: '100%' }}>
        <UIInfoTitle sx={{ width: 'auto', color: '#E4D79B', fontSize: '18px' }}>
          %Redeemed
        </UIInfoTitle>
        <Typography sx={{ color: '#E4D79B', fontSize: '24px' }}>55</Typography>
      </UIFlexColumnBox>
    </UIFlexSpaceBox>
  );
};

export default CampaignOverview;
