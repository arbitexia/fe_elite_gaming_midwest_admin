import { CampaignDetailInfoEditCard } from '@/modules/Campaign';
import { DashboardLayout } from '@/layouts';
import { CampaignType } from '@/types';
import { useCampaign } from '@/hooks';
import { useRouter } from 'next/router';
import { CouponEnum } from '@/constants';

const CreateCampaignPage = () => {
  const router = useRouter();
  const { onSaveCampaign } = useCampaign();
  const initCampaignData: CampaignType.Data = {
    id: 0,
    name: '',
    model: '',
    type: '',
    offer: 0,
    offerType: CouponEnum.COUPON,
    total: 0,
    redeemed: 0,
    startDate: '',
    endDate: '',
    channels: 0,
    status: 1,
  };

  const handleSave = (value: CampaignType.Body) => {
    onSaveCampaign(value);
    router.push('/campaigns');
  };
  return (
    <DashboardLayout title="Campaigns">
      <CampaignDetailInfoEditCard
        campaign={initCampaignData}
        type="create"
        onSave={handleSave}
      />
    </DashboardLayout>
  );
};

export default CreateCampaignPage;
