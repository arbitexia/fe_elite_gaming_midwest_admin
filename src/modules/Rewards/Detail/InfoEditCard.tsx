import { Box, Typography, Stack, MenuItem } from '@mui/material';
import { UIFlexWrapBox, UIEditTextField } from '@/components/UI';
import { StyledLocationCardBox, StyledLocationInfoTitle } from './ui';
import { LocationType, ProductType } from '@/types';
import 'react-quill/dist/quill.snow.css';
import { FormikProps } from 'formik';
import dynamic from 'next/dynamic';
import { useLocation } from '@/hooks';
// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
const ReactQuill: any = dynamic(
  () => {
    return import('react-quill');
  },
  { loading: () => null, ssr: false }
);

const RewardsDetailInfoCard = ({
  productFormik,
}: {
  productFormik: FormikProps<ProductType>;
}) => {
  const { locations, onGetLocations } = useLocation();
  if (locations.length < 1) onGetLocations({ filterBy: { search: '' } });
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      [{ font: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'font',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];

  return (
    <StyledLocationCardBox>
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
      <UIFlexWrapBox sx={{ paddingTop: '20px', gap: '40px' }}>
        <Stack direction="column" sx={{ flex: '1 1 0', gap: '18px' }}>
          <UIFlexWrapBox sx={{ alignItems: 'center' }}>
            <StyledLocationInfoTitle>Name:</StyledLocationInfoTitle>
            <Box flexGrow={1}>
              <UIEditTextField
                name="name"
                value={productFormik.values.name}
                onChange={productFormik.handleChange}
                fullWidth
              />
            </Box>
          </UIFlexWrapBox>
          <UIFlexWrapBox sx={{ alignItems: 'center' }}>
            <StyledLocationInfoTitle>Point:</StyledLocationInfoTitle>
            <Box flexGrow={1}>
              <UIEditTextField
                name="point"
                value={productFormik.values.point}
                onChange={productFormik.handleChange}
                fullWidth
              />
            </Box>
          </UIFlexWrapBox>
        </Stack>
        <Stack direction="column" sx={{ flex: '1 1 0', gap: '18px' }}>
          <UIFlexWrapBox sx={{ alignItems: 'center' }}>
            <StyledLocationInfoTitle>Location:</StyledLocationInfoTitle>
            <Box flexGrow={1}>
              <UIEditTextField
                name="locationId"
                defaultValue={0}
                value={productFormik.values.locationId}
                onChange={productFormik.handleChange}
                fullWidth
                select
              >
                {locations.map((option: LocationType) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </UIEditTextField>
            </Box>
          </UIFlexWrapBox>
          <UIFlexWrapBox sx={{ alignItems: 'center' }}>
            <StyledLocationInfoTitle>Amount:</StyledLocationInfoTitle>
            <Box flexGrow={1}>
              <UIEditTextField
                name="amount"
                value={productFormik.values.amount}
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
          paddingTop: '20px',
        }}
      >
        <StyledLocationInfoTitle>Short:</StyledLocationInfoTitle>
        <Box>
          <UIEditTextField
            name="short"
            value={productFormik.values.short}
            onChange={productFormik.handleChange}
            fullWidth
            multiline
            rows={3}
          />
        </Box>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '350px',
          paddingTop: '20px',
          '.quill': { height: '250px', marginTop: '20px' },
        }}
      >
        <StyledLocationInfoTitle>Description:</StyledLocationInfoTitle>
        <ReactQuill
          theme="snow"
          value={productFormik.values.description}
          onChange={(e: string) =>
            productFormik.setFieldValue('description', e)
          }
          modules={modules}
          formats={formats}
        />
      </Box>
    </StyledLocationCardBox>
  );
};

export default RewardsDetailInfoCard;
