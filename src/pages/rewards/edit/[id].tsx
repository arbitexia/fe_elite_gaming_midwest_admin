import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { DashboardLayout } from '@/layouts';
import { UIFlexSpaceBox } from '@/components/UI';
import {
  RewardsDetailHeader,
  RewardsDetailCarouselEditCard,
  RewardsDetailInfoEditCard,
} from '@/modules/Rewards';
import { rewardsData } from '@/_mock/rewards';
import { RewardItemType } from '@/types';

const LocationsById = () => {
  const router = useRouter();
  const { id } = router.query;
  const [rewardsItem, setrewardsItem] = useState<
    RewardItemType | undefined | null
  >(null);
  useEffect(() => {
    setrewardsItem(
      rewardsData.find((item) => item.id === parseInt(id as string))
    );
  }, [id]);
  return (
    <DashboardLayout title={rewardsItem ? rewardsItem.name : 'Rewards'}>
      {rewardsItem && (
        <>
          <RewardsDetailHeader name={rewardsItem.name} isEditable={true} />
          <UIFlexSpaceBox sx={{ gap: '20px' }}>
            <RewardsDetailCarouselEditCard rewardsItem={rewardsItem} />
            <RewardsDetailInfoEditCard rewardsItem={rewardsItem} />
          </UIFlexSpaceBox>
        </>
      )}
    </DashboardLayout>
  );
};

export default LocationsById;
