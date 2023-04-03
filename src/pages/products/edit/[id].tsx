import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { Box, Divider } from '@mui/material';
import { productMockData } from '@/_mock/product';
import { useAsset, useProduct } from '@/hooks';
import { DashboardLayout } from '@/layouts';
import { useAppToast } from '@/providers';
import { Product } from '@/types';
import {
  ProductsDetailHeader,
  ProductsDetailCarouselEditCard,
  ProductsDetailInfoEditCard,
} from '@/modules/Products';
import { UIFlexSpaceBox } from '@/components/UI';

const ProductEdit = () => {
  const router = useRouter();
  const appToast = useAppToast();
  const { id } = router.query;
  const { onGetProductById, onUpdateProduct } = useProduct();
  const { onSaveGallery } = useAsset();
  const [productItem, setProductItem] = useState<
    Product.Data | undefined | null
  >(null);

  const productFormik = useFormik<Product.Data>({
    initialValues: productItem ?? productMockData,
    onSubmit: async (values) => {
      const params: Product.Param & Product.Body = {
        id: values.id,
        input: {
          name: values.name,
          amount: values.amount,
          point: values.point,
          status: values.status,
          short: values.short,
          description: values.description,
        },
      };
      onUpdateProduct(params);
      onSaveGallery(values.id, 'PRODUCT');
      router.push('/products');
      appToast({
        severity: 'success',
        message: 'Successfully, product has been updated!',
      });
    },
  });

  useEffect(() => {
    const product = onGetProductById(parseInt(id as string));
    setProductItem(product);
    if (product) {
      productFormik.setValues(product);
    }
  }, [id]);
  return (
    <DashboardLayout title={productItem ? productItem.name : 'Products'}>
      {productFormik && (
        <Box component="form" onSubmit={productFormik.handleSubmit}>
          <ProductsDetailHeader
            name={productFormik.values.name}
            isEditable={true}
          />
          <Divider sx={{ mt: '18px', mb: '30px' }} />
          <UIFlexSpaceBox sx={{ gap: '20px' }}>
            <ProductsDetailCarouselEditCard />
            {productItem && (
              <ProductsDetailInfoEditCard productFormik={productFormik} />
            )}
          </UIFlexSpaceBox>
        </Box>
      )}
    </DashboardLayout>
  );
};

export default ProductEdit;
