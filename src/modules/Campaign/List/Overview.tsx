import { Typography } from '@mui/material';
import { UIFlexSpaceBox, UIFlexColumnBox, UIInfoTitle } from '@/components/UI';
import { CampaignType } from '@/types';

interface CampaignOverviewProps {
  overviewInfo: CampaignType.OverviewInfo;
}

const CampaignOverview = ({ overviewInfo }: CampaignOverviewProps) => {
  return (
    <UIFlexSpaceBox sx={{ my: 4 }}>
      <UIFlexColumnBox sx={{ width: '100%' }}>
        <UIInfoTitle sx={{ width: 'auto', color: '#7F7F7F', fontSize: '18px' }}>
          Campaigns
        </UIInfoTitle>
        <Typography sx={{ color: '#7F7F7F', fontSize: '24px' }}>
          {overviewInfo.campaigns}
        </Typography>
      </UIFlexColumnBox>
      <UIFlexColumnBox sx={{ width: '100%' }}>
        <UIInfoTitle sx={{ width: 'auto', color: '#D6C4AA', fontSize: '18px' }}>
          Offer issued
        </UIInfoTitle>
        <Typography sx={{ color: '#D6C4AA', fontSize: '24px' }}>
          {overviewInfo.offerIssued}
        </Typography>
      </UIFlexColumnBox>
      <UIFlexColumnBox sx={{ width: '100%' }}>
        <UIInfoTitle sx={{ width: 'auto', color: '#D9D9D9', fontSize: '18px' }}>
          Offers Redeemed
        </UIInfoTitle>
        <Typography sx={{ color: '#D9D9D9', fontSize: '24px' }}>
          {overviewInfo.offersRedeemed.toFixed(0)}
        </Typography>
      </UIFlexColumnBox>
      <UIFlexColumnBox sx={{ width: '100%' }}>
        <UIInfoTitle sx={{ width: 'auto', color: '#E4D79B', fontSize: '18px' }}>
          %Redeemed
        </UIInfoTitle>
        <Typography sx={{ color: '#E4D79B', fontSize: '24px' }}>
          {overviewInfo.Redeemed.toFixed(0)}
        </Typography>
      </UIFlexColumnBox>
    </UIFlexSpaceBox>
  );
};

export default CampaignOverview;
