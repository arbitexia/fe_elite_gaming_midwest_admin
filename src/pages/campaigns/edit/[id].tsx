import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { DashboardLayout } from '@/layouts';
import { useCampaign, useEmailTemplate } from '@/hooks';
import { CampaignType } from '@/types';
import { CampaignDetailInfoEditCard } from '@/modules/Campaign';

const EditCampaignPage = () => {
  const router = useRouter();
  const { onSaveCampaign, onSelectCampaign } = useCampaign();
  const { emailTemplates, onGetEmailTemplates } = useEmailTemplate();
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignType.Data>();
  const { id } = router.query;
  useEffect(() => {
    const fetchEmailTemplates = async () => {
      await onGetEmailTemplates({
        filterBy: {
          search: '',
        },
        cursor: { page: 0, size: 1000 },
      });
    };
    if (id) {
      const campaign = onSelectCampaign(Number(id));
      if (!campaign) {
        router.push('/404');
        return;
      }
      setSelectedCampaign(campaign);
      fetchEmailTemplates();
    }
  }, [id]);

  const handleSave = (value: CampaignType.Body) => {
    onSaveCampaign(value);
    router.push('/campaigns');
  };

  return (
    <DashboardLayout title="Campaigns">
      {selectedCampaign && (
        <CampaignDetailInfoEditCard
          campaign={selectedCampaign}
          onSave={handleSave}
          emailTemplates={emailTemplates ?? []}
        />
      )}
    </DashboardLayout>
  );
};

export default EditCampaignPage;
