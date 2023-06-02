import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { Box, Divider } from '@mui/material';
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
import { ProductSchema } from '@/libs/yupSchema';

const ProductsCreate = () => {
  const router = useRouter();
  const appToast = useAppToast();
  const { onCreateProduct } = useProduct();
  const { onSetGalleries, onSaveGallery } = useAsset();
  const [isReady, setIsReady] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>();

  useEffect(() => {
    if (!isReady) return;
    onSetGalleries([]);
    setIsReady(false);
  }, [isReady]);

  const initProductData: Product.Data = {
    id: 0,
    name: '',
    amount: 1,
    status: '',
    short: '',
    description: '',
  };

  const productFormik = useFormik<Product.Data>({
    initialValues: initProductData,
    validationSchema: ProductSchema,
    onSubmit: async (values) => {
      const params: Product.Body = {
        input: {
          name: values.name,
          amount: values.amount,
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
    <DashboardLayout title={'Products'}>
      <Box component="form" onSubmit={handleClickSave}>
        <ProductsDetailHeader
          name={productFormik.values.name}
          isEditable={true}
        />
        <Divider sx={{ my: '18px' }} />
        <UIFlexSpaceBox sx={{ gap: '20px' }}>
          <ProductsDetailCarouselEditCard />
          <ProductsDetailInfoEditCard productFormik={productFormik} />
        </UIFlexSpaceBox>
      </Box>
    </DashboardLayout>
  );
};

export default ProductsCreate;
