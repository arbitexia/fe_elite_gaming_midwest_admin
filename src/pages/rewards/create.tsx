import { DashboardLayout } from '@/layouts';
import { UIFlexSpaceBox } from '@/components/UI';
import {
  RewardsDetailHeader,
  RewardsDetailCarouselEditCard,
  RewardsDetailInfoEditCard,
} from '@/modules/Rewards';
import { ProductType } from '@/types';
import { useAsset, useProduct } from '@/hooks';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { initProductData } from '@/_mock/rewards';

const RewardsCreate = () => {
  const router = useRouter();
  const { onCreateProduct } = useProduct();
  const { onSetGalleries, onSaveGallery } = useAsset();
  const [isReady, setIsReady] = useState(true);

  useEffect(() => {
    if (!isReady) return;
    onSetGalleries([]);
    setIsReady(false);
  }, [isReady]);

  const productFormik = useFormik<ProductType>({
    initialValues: initProductData,
    onSubmit: async (values: ProductType) => {
      let params: ProductType = {
        id: 0,
        name: values.name,
        locationId: values.locationId,
        amount:
          typeof values.amount == 'string'
            ? parseInt(values.amount as string)
            : values.amount,
        point:
          typeof values.point == 'string'
            ? parseInt(values.point as string)
            : values.point,
        status: values.status,
        short: values.short ?? '',
        description: values.description ?? '',
      };
      const product = await onCreateProduct(params);
      if (product.id) {
        await onSaveGallery(product.id, 'PRODUCT');
        router.push(`/rewards`);
      }
    },
  });

  return (
    <DashboardLayout title={'Rewards'}>
      <Box component="form" onSubmit={productFormik.handleSubmit}>
        <RewardsDetailHeader
          name={productFormik.values.name}
          isEditable={true}
        />
        <UIFlexSpaceBox sx={{ gap: '20px' }}>
          <RewardsDetailCarouselEditCard />
          <RewardsDetailInfoEditCard productFormik={productFormik} />
        </UIFlexSpaceBox>
      </Box>
    </DashboardLayout>
  );
};

export default RewardsCreate;
