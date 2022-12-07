import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { DashboardLayout } from '@/layouts';
import { UIFlexSpaceBox } from '@/components/UI';
import {
  RewardsDetailHeader,
  RewardsDetailCarouselCard,
  RewardsDetailInfoCard,
} from '@/modules/Rewards';
import { rewardsData } from '@/_mock/rewards';
import { RewardItemType } from '@/types';

const RewardsById = () => {
  const router = useRouter();
  const { id } = router.query;
  const [rewardsItem, setRewardsItem] = useState<
    RewardItemType | undefined | null
  >(null);
  useEffect(() => {
    setRewardsItem(
      rewardsData.find((item) => item.id === parseInt(id as string))
    );
  }, [id]);
  return (
    <DashboardLayout title={rewardsItem ? rewardsItem.name : 'Rewards'}>
      {rewardsItem && (
        <>
          <RewardsDetailHeader name={rewardsItem.name} isEditable={false} />
          <UIFlexSpaceBox sx={{ gap: '20px' }}>
            <RewardsDetailCarouselCard rewardsItem={rewardsItem} />
            <RewardsDetailInfoCard rewardsItem={rewardsItem} />
          </UIFlexSpaceBox>{' '}
        </>
      )}
    </DashboardLayout>
  );
};

export default RewardsById;
