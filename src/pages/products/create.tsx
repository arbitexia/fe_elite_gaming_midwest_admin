import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import { productMockData } from '@/_mock/product';
import { useProduct, useAsset } from '@/hooks';
import { DashboardLayout } from '@/layouts';
import { UIFlexSpaceBox } from '@/components/UI';
import {
  ProductsDetailHeader,
  ProductsDetailCarouselEditCard,
  ProductsDetailInfoEditCard,
} from '@/modules/Products';
import { useAppToast } from '@/providers';
import { Product } from '@/types';

const ProductsCreate = () => {
  const router = useRouter();
  const appToast = useAppToast();
  const { onCreateProduct } = useProduct();
  const { onSetGalleries, onSaveGallery } = useAsset();
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    if (!isReady) return;
    onSetGalleries([]);
    setIsReady(false);
  }, [isReady]);

  const productFormik = useFormik<Product.Data>({
    initialValues: productMockData,
    onSubmit: async (values) => {
      const params: Product.Body = {
        input: {
          name: values.name,
          amount: values.amount,
          point: values.point,
          status: values.status,
          short: values.short,
          description: values.description,
        },
      };
      const product = await onCreateProduct(params);
      onSaveGallery(product.id, 'PRODUCT');
      router.push('/products');
      appToast({
        severity: 'success',
        message: 'Successfully, new product has been registered!',
      });
    },
  });

  return (
    <DashboardLayout
      title={productMockData ? productMockData.name : 'Products'}
    >
      <Box component="form" onSubmit={productFormik.handleSubmit}>
        <ProductsDetailHeader
          name={productFormik.values.name}
          isEditable={true}
        />
        <UIFlexSpaceBox sx={{ gap: '20px' }}>
          <ProductsDetailCarouselEditCard />
          <ProductsDetailInfoEditCard productFormik={productFormik} />
        </UIFlexSpaceBox>
      </Box>
    </DashboardLayout>
  );
};

export default ProductsCreate;
