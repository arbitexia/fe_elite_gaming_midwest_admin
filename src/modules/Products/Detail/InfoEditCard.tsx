import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { FormikProps } from 'formik';
import { Box, Typography, Stack } from '@mui/material';
import {
  UICardBox,
  UIFlexWrapBox,
  UIEditTextField,
  UIInfoTitle,
  UIFlexSpaceBox,
} from '@/components/UI';
import { formats, modules } from '@/constants';
import { Product } from '@/types';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(
  () => {
    return import('react-quill');
  },
  { loading: () => null, ssr: false }
);

interface IProductsDetailInfoEditCard {
  productFormik: FormikProps<Product.Data>;
}

const ProductsDetailInfoEditCard = ({
  productFormik,
}: IProductsDetailInfoEditCard) => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [desc, setDesc] = useState('');
  useEffect(() => {
    if (!isReady) return;
    setIsReady(false);
  }, [isReady]);

  useEffect(() => {
    if (productFormik.values.description) {
      setDesc(productFormik.values.description);
    }
  }, [productFormik.values.description]);

  return (
    <UICardBox>
      <Typography
        sx={{
          fontWeight: '600',
          fontSize: '18px',
          lineHeight: '17px',
          color: '#222B35',
        }}
      >
        Information:
      </Typography>
      <UIFlexSpaceBox sx={{ paddingTop: '20px' }}>
        <UIFlexWrapBox sx={{ alignItems: 'center' }}>
          <UIInfoTitle>Name:</UIInfoTitle>
          <Box>
            <UIEditTextField
              name="name"
              value={productFormik.values.name}
              onChange={productFormik.handleChange}
              fullWidth
            />
          </Box>
        </UIFlexWrapBox>
        <UIFlexWrapBox sx={{ alignItems: 'center' }}>
          <UIInfoTitle>Amount:</UIInfoTitle>
          <Box>
            <UIEditTextField
              name="amount"
              value={productFormik.values.amount}
              onChange={productFormik.handleChange}
              fullWidth
              type="number"
            />
          </Box>
        </UIFlexWrapBox>
      </UIFlexSpaceBox>
      <Box sx={{ paddingTop: '20px' }}>
        <UIInfoTitle>Short:</UIInfoTitle>
        <UIFlexWrapBox sx={{ mt: 1 }}>
          <UIEditTextField
            name="short"
            value={productFormik.values.short}
            onChange={productFormik.handleChange}
            fullWidth
          />
        </UIFlexWrapBox>
      </Box>
      <Box sx={{ paddingTop: '20px' }}>
        <UIInfoTitle>Description:</UIInfoTitle>
        <UIFlexWrapBox sx={{ mt: 1 }}>
          <UIEditTextField
            name="description"
            value={productFormik.values.description}
            onChange={productFormik.handleChange}
            fullWidth
          />
        </UIFlexWrapBox>
      </Box>
    </UICardBox>
  );
};

export default ProductsDetailInfoEditCard;
