import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { UIFlexSpaceBox } from '@/components/UI';
import { useProduct } from '@/hooks';
import { DashboardLayout } from '@/layouts';
import {
  RewardsDetailHeader,
  RewardsDetailCarouselCard,
  RewardsDetailInfoCard,
} from '@/modules/Rewards';
import { Product } from '@/types';

const RewardsById = () => {
  const router = useRouter();
  const { id } = router.query;
  const { onGetProductById } = useProduct();
  const [productItem, setProductItem] = useState<Product | undefined | null>(
    null
  );

  useEffect(() => {
    setProductItem(onGetProductById(parseInt(id as string)));
  }, [id]);

  return (
    <DashboardLayout title={productItem ? productItem.name : 'Rewards'}>
      {productItem && (
        <>
          <RewardsDetailHeader name={productItem.name} isEditable={false} />
          <UIFlexSpaceBox sx={{ gap: '20px' }}>
            <RewardsDetailCarouselCard />
            <RewardsDetailInfoCard productItem={productItem} />
          </UIFlexSpaceBox>{' '}
        </>
      )}
    </DashboardLayout>
  );
};

export default RewardsById;
