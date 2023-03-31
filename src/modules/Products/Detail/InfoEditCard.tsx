import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { FormikProps } from 'formik';
import { Box, Typography, Stack } from '@mui/material';
import {
  UICardBox,
  UIFlexWrapBox,
  UIEditTextField,
  UIInfoTitle,
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
      <UIFlexWrapBox sx={{ paddingTop: '20px' }}>
        <Stack direction="column" sx={{ flex: '1 1 0', gap: '18px' }}>
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
        </Stack>
        <Stack direction="column" sx={{ flex: '1 1 0', gap: '18px' }}>
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
        </Stack>
      </UIFlexWrapBox>
      <UIFlexWrapBox sx={{ paddingTop: '20px' }}>
        <Stack direction="column" sx={{ flex: '1 1 0', gap: '18px' }}>
          <UIFlexWrapBox sx={{ alignItems: 'center' }}>
            <UIInfoTitle>Points:</UIInfoTitle>
            <Box>
              <UIEditTextField
                name="point"
                value={productFormik.values.point}
                onChange={productFormik.handleChange}
                fullWidth
                type="number"
              />
            </Box>
          </UIFlexWrapBox>
        </Stack>
        <Stack direction="column" sx={{ flex: '1 1 0', gap: '18px' }}>
          <UIFlexWrapBox sx={{ alignItems: 'center' }}>
            <UIInfoTitle>Short:</UIInfoTitle>
            <Box>
              <UIEditTextField
                name="short"
                value={productFormik.values.short}
                onChange={productFormik.handleChange}
                fullWidth
              />
            </Box>
          </UIFlexWrapBox>
        </Stack>
      </UIFlexWrapBox>
      <Box
        sx={{
          width: '100%',
          height: '350px',
          paddingTop: '20px',
          '.quill': { height: '220px', marginTop: '20px' },
        }}
      >
        <UIInfoTitle>Description:</UIInfoTitle>
        <ReactQuill
          theme="snow"
          value={desc}
          placeholder={productFormik.values.description}
          onChange={(data) => {
            setDesc(data);
            productFormik.setFieldValue('description', data);
          }}
          modules={modules}
          formats={formats}
        />
      </Box>
    </UICardBox>
  );
};

export default ProductsDetailInfoEditCard;
