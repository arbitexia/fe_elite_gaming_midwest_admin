import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { DashboardLayout } from '@/layouts';
import { useCampaign } from '@/hooks';
import { CampaignType } from '@/types';
import { CampaignDetailInfoEditCard } from '@/modules/Campaign';

const EditCampaignPage = () => {
  const router = useRouter();
  const { onSaveCampaign, onSelectCampaign } = useCampaign();
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignType.Data>();
  const { id } = router.query;
  useEffect(() => {
    if (id) {
      const campaign = onSelectCampaign(Number(id));
      if (!campaign) {
        router.push('/404');
        return;
      }
      setSelectedCampaign(campaign);
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
          type="edit"
          onSave={handleSave}
        />
      )}
    </DashboardLayout>
  );
};

export default EditCampaignPage;
