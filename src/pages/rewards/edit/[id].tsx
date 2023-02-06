import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { DashboardLayout } from '@/layouts';
import { UIFlexSpaceBox } from '@/components/UI';
import {
  RewardsDetailHeader,
  RewardsDetailCarouselEditCard,
  RewardsDetailInfoEditCard,
} from '@/modules/Rewards';
import { ProductType } from '@/types';
import { useFormik } from 'formik';
import { useAsset, useProduct } from '@/hooks';
import { Box } from '@mui/material';
import { initProductData } from '@/_mock/rewards';

const RewardsById = () => {
  const router = useRouter();
  const { id } = router.query;
  const { currentProduct, onGetProductById, onUpdateProduct } = useProduct();
  const [productItem, setProductItem] = useState<ProductType | null>(
    currentProduct
  );
  const { onSaveGallery } = useAsset();

  useEffect(() => {
    const product = onGetProductById(parseInt(id as string));
    if (!product) {
      router.push(`/rewards`);
      return;
    }
    setProductItem(product);
    productFormik.setValues(product ?? initProductData);
  }, [id]);

  const productFormik = useFormik<ProductType>({
    initialValues: productItem ?? initProductData,
    onSubmit: async (values) => {
      let params: ProductType = {
        id: parseInt(id as string),
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
        short: values.short,
        description: values.description,
      };

      const product = await onUpdateProduct(params);
      if (product.id) {
        await onSaveGallery(product.id, 'PRODUCT');
        router.push(`/rewards`);
      }
    },
  });

  return (
    <DashboardLayout title={productItem ? productItem.name : 'Rewards'}>
      {productItem && (
        <Box component="form" onSubmit={productFormik.handleSubmit}>
          <RewardsDetailHeader name={productItem.name} isEditable={true} />
          <UIFlexSpaceBox sx={{ gap: '20px' }}>
            <RewardsDetailCarouselEditCard />
            <RewardsDetailInfoEditCard productFormik={productFormik} />
          </UIFlexSpaceBox>{' '}
        </Box>
      )}
    </DashboardLayout>
  );
};

export default RewardsById;
