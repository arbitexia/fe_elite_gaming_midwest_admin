import { useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Typography,
  Stack,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import { PersonOutline as PersonOutlineIcon } from '@mui/icons-material';
import {
  UIAuthCardWrapper,
  UIImage,
  UIAuthTextField,
  UIAuthButton,
} from '@/components/UI';
import { AuthLayout } from '@/layouts';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '@/hooks';

type LoginValue = {
  identifier: string;
};

export const ForgotPasswordSchema = yup.object({
  identifier: yup.string().required('Username is required'),
});

const ForgotPassword = () => {
  const { onLogin } = useAuth();
  const loading = false;
  const formik = useFormik({
    initialValues: {
      identifier: '',
      password: '',
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: async (values: LoginValue) => {
      onLogin('token');
      // await authorize({ variables: { ...values } });
    },
  });

  return (
    <AuthLayout bg="rgba(137, 200, 198, 0.2)">
      <Box
        sx={{
          width: 130,
          height: 130,
          position: 'absolute',
          left: 50,
          top: 50,
        }}
      >
        <UIImage src="images/circle-left.svg" width={130} height={130} />
      </Box>
      <Box
        sx={{
          width: 281,
          height: 281,
          position: 'absolute',
          bottom: 195,
          right: 40,
        }}
      >
        <UIImage src="images/circle-right.svg" width={281} height={281} />
      </Box>
      <UIAuthCardWrapper>
        <UIImage src={'images/icons/logo.svg'} width={80} height={80} />
        <Box>
          <Typography
            component="h3"
            variant="h3"
            sx={{
              textAlign: 'center',
              fontWeight: 600,
              fontSize: '32px',
              lineHeight: '110%',
              letterSpacing: '-1px',
              color: '#006F69',
            }}
          >
            Forgot password?
          </Typography>

          <Typography
            sx={{
              textAlign: 'center',
              fontSize: '14px',
              color: '#B3B3B3',
              marginTop: 2,
            }}
          >
            Don’t worry we can help you out! if you still remember your email
            address you can quickly reset your password.
          </Typography>
        </Box>
        <Stack spacing={2.5} component="form" onSubmit={formik.handleSubmit}>
          <UIAuthTextField
            fullWidth
            size="small"
            placeholder="Username"
            id="identifier"
            name="identifier"
            value={formik.values.identifier}
            onChange={formik.handleChange}
            error={
              formik.touched.identifier && Boolean(formik.errors.identifier)
            }
            helperText={formik.touched.identifier && formik.errors.identifier}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon sx={{ color: '#83A9A8' }} />
                </InputAdornment>
              ),
            }}
          />

          <Box
            sx={{
              alignSelf: 'center',
              width: 170,
            }}
          >
            <UIAuthButton type="submit" disabled={loading}>
              {loading ? (
                <CircularProgress color="inherit" size={24} />
              ) : (
                'Reset'
              )}
            </UIAuthButton>
          </Box>
          <Typography
            sx={{
              textAlign: 'center',
              fontSize: '12px',
              color: '#B3B3B3',
            }}
          >
            This will send you a new email that will link you to the password
            change website.
          </Typography>
        </Stack>
      </UIAuthCardWrapper>
    </AuthLayout>
  );
};

export default ForgotPassword;
