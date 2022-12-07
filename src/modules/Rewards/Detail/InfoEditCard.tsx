import { useState } from 'react';
import { Box, Typography, Stack, MenuItem } from '@mui/material';
import { UIFlexWrapBox, UIEditTextField } from '@/components/UI';
import { StyledLocationCardBox, StyledLocationInfoTitle } from './ui';
import { RewardsDetailProps } from '@/types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';
import { locationsData } from '@/_mock/locations';

const RewardsDetailInfoCard = ({ rewardsItem }: RewardsDetailProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, setValue] = useState('');

  const userFormik = useFormik({
    initialValues: rewardsItem,
    onSubmit: async (values) => {
      console.log(values);
      // await authorize({ variables: { ...values } });
    },
  });

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
      <UIFlexWrapBox sx={{ paddingTop: '20px' }}>
        <Stack direction="column" sx={{ flex: '1 1 0', gap: '18px' }}>
          <UIFlexWrapBox sx={{ alignItems: 'center' }}>
            <StyledLocationInfoTitle>Points:</StyledLocationInfoTitle>
            <Box>
              <UIEditTextField
                name="name"
                value={userFormik.values.name}
                onChange={userFormik.handleChange}
                fullWidth
              />
            </Box>
          </UIFlexWrapBox>
          <UIFlexWrapBox sx={{ alignItems: 'center' }}>
            <StyledLocationInfoTitle>Location:</StyledLocationInfoTitle>
            <Box width={230}>
              <UIEditTextField
                name="location"
                value={userFormik.values.location}
                onChange={userFormik.handleChange}
                fullWidth
                select
              >
                <MenuItem value={0}>All</MenuItem>
                {locationsData.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </UIEditTextField>
            </Box>
          </UIFlexWrapBox>
        </Stack>
        <Stack direction="column" sx={{ flex: '1 1 0', gap: '18px' }}>
          <UIFlexWrapBox sx={{ alignItems: 'center' }}>
            <StyledLocationInfoTitle>Amount:</StyledLocationInfoTitle>
            <Box>
              <UIEditTextField
                name="amount"
                value={userFormik.values.amount}
                onChange={userFormik.handleChange}
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
          '.quill': { height: '250px', marginTop: '20px' },
        }}
      >
        <StyledLocationInfoTitle>Description:</StyledLocationInfoTitle>
        <ReactQuill theme="snow" value={value} onChange={setValue} />
      </Box>
    </StyledLocationCardBox>
  );
};

export default RewardsDetailInfoCard;
