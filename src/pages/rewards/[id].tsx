import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { DashboardLayout } from '@/layouts';
import { UIFlexSpaceBox } from '@/components/UI';
import {
  RewardsDetailHeader,
  RewardsDetailCarouselCard,
  RewardsDetailInfoCard,
} from '@/modules/Rewards';
import { ProductType } from '@/types';
import { useProduct } from '@/hooks';

const RewardsById = () => {
  const router = useRouter();
  const { id } = router.query;
  const { onGetProductById } = useProduct();
  const [rewardsItem, setRewardsItem] = useState<
    ProductType | undefined | null
  >(null);
  useEffect(() => {
    setRewardsItem(onGetProductById(parseInt(id as string)));
  }, [id]);
  return (
    <DashboardLayout title={rewardsItem ? rewardsItem.name : 'Rewards'}>
      {rewardsItem && (
        <>
          <RewardsDetailHeader name={rewardsItem.name} isEditable={false} />
          <UIFlexSpaceBox sx={{ gap: '20px' }}>
            <RewardsDetailCarouselCard />
            <RewardsDetailInfoCard rewardsItem={rewardsItem} />
          </UIFlexSpaceBox>{' '}
        </>
      )}
    </DashboardLayout>
  );
};

export default RewardsById;
