import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { FormikProps } from 'formik';
import { Box, Typography, Stack, MenuItem } from '@mui/material';
import {
  UICardBox,
  UIFlexWrapBox,
  UIEditTextField,
  UIInfoTitle,
} from '@/components/UI';
import { formats, modules } from '@/constants';
import { useLocation } from '@/hooks';
import { Product } from '@/types';

const ReactQuill = dynamic(
  () => {
    return import('react-quill');
  },
  { loading: () => null, ssr: false }
);

const ProductsDetailInfoEditCard = ({
  productFormik,
}: {
  productFormik: FormikProps<Product>;
}) => {
  const { locations, onGetLocations } = useLocation();
  const [value, setValue] = useState('');
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    if (!isReady) return;
    onGetLocations({ filterBy: { search: '' } });
    setIsReady(false);
  }, [isReady]);

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
          <UIFlexWrapBox sx={{ alignItems: 'center' }}>
            <UIInfoTitle>Location:</UIInfoTitle>
            <Box width={230}>
              <UIEditTextField
                name="location"
                defaultValue={locations[0].id}
                value={productFormik.values.location}
                onChange={productFormik.handleChange}
                fullWidth
                select
              >
                {locations.map((location) => (
                  <MenuItem
                    key={`location-option-${location.id}`}
                    value={location.id}
                  >
                    {location.name}
                  </MenuItem>
                ))}
              </UIEditTextField>
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
      <Box
        sx={{
          width: '100%',
          height: '350px',
          paddingTop: '20px',
          '.quill': { height: '250px', marginTop: '20px' },
        }}
      >
        <UIInfoTitle>Description:</UIInfoTitle>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          modules={modules}
          formats={formats}
        />
      </Box>
    </UICardBox>
  );
};

export default ProductsDetailInfoEditCard;
