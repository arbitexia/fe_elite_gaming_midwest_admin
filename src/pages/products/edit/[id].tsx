import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { Box, Divider } from '@mui/material';
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
import { ProductSchema } from '@/libs/yupSchema';

const ProductEdit = () => {
  const router = useRouter();
  const appToast = useAppToast();
  const { id } = router.query;
  const { onGetProductById, onUpdateProduct } = useProduct();
  const { onSaveGallery } = useAsset();
  const [productItem, setProductItem] = useState<
    Product.Data | undefined | null
  >(null);
  const [errorMsg, setErrorMsg] = useState<string>();

  const initProductData: Product.Data = {
    id: 0,
    name: '',
    amount: 1,
    status: '',
    short: '',
    description: '',
  };

  const productFormik = useFormik<Product.Data>({
    initialValues: productItem ?? initProductData,
    validationSchema: ProductSchema,
    onSubmit: async (values) => {
      const params: Product.Param & Product.Body = {
        id: values.id,
        input: {
          name: values.name,
          amount: values.amount,
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

  useEffect(() => {
    if (errorMsg) {
      appToast({
        severity: 'error',
        message: errorMsg,
      });
      setErrorMsg(undefined);
    }
  }, [errorMsg]);

  const handleClickSave = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (JSON.stringify(productFormik.errors) !== '{}') {
      const errorKey = Object.keys(
        productFormik.errors
      )[0] as keyof typeof productFormik.errors;
      setErrorMsg(productFormik.errors[errorKey] as string | undefined);
      return;
    }
    productFormik.handleSubmit();
  };

  return (
    <DashboardLayout title={productItem ? productItem.name : 'Products'}>
      {productFormik && (
        <Box component="form" onSubmit={handleClickSave}>
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
