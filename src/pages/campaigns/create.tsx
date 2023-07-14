import { useEffect } from 'react';
import { CampaignDetailInfoEditCard } from '@/modules/Campaign';
import { DashboardLayout } from '@/layouts';
import { CampaignType } from '@/types';
import { useCampaign, useEmailTemplate } from '@/hooks';
import { useRouter } from 'next/router';
import { CouponEnum } from '@/constants';

const CreateCampaignPage = () => {
  const router = useRouter();
  const { onSaveCampaign } = useCampaign();
  const {
    emailTemplates,
    onGetEmailTemplates,
    sendinEmails,
    onGetSendinBlueEmails,
  } = useEmailTemplate();
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

  useEffect(() => {
    const fetchEmailTemplates = async () => {
      await onGetEmailTemplates({
        filterBy: {
          search: '',
        },
        cursor: { page: 0, size: 1000 },
      });
      await onGetSendinBlueEmails();
    };
    fetchEmailTemplates();
  }, []);

  const handleSave = (value: CampaignType.Body) => {
    onSaveCampaign(value);
    router.push('/campaigns');
  };
  return (
    <DashboardLayout title="Campaigns">
      <CampaignDetailInfoEditCard
        campaign={initCampaignData}
        onSave={handleSave}
        emailTemplates={emailTemplates ?? []}
        sendinEmails={sendinEmails ?? []}
      />
    </DashboardLayout>
  );
};

export default CreateCampaignPage;
