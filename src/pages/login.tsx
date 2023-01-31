import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Box,
  Typography,
  Stack,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@mui/material';
import {
  PersonOutline as PersonOutlineIcon,
  LockOutlined as LockOutlinedIcon,
  VisibilityOffOutlined as VisibilityOffOutlinedIcon,
  VisibilityOutlined as VisibilityOutlinedIcon,
} from '@mui/icons-material';
import {
  UIAuthCardWrapper,
  UIImage,
  UIFlexColumnBox,
  UIAuthTextField,
  UIDefaultButton,
} from '@/components/UI';
import { AuthLayout } from '@/layouts';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '@/hooks';

type LoginValue = {
  identifier: string;
  password: string;
};

export const LoginSchema = yup.object({
  identifier: yup.string().required('Username is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const LoginPage = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) router.push('/users/customers');

  const { onLogin } = useAuth({
    handleAuthUserSuccess: () => {
      router.push('/users/customers');
    },
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const loading = false;
  const formik = useFormik({
    initialValues: {
      identifier: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values: LoginValue) => {
      onLogin(values.identifier, values.password);
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
            Hello Again!
          </Typography>
          <Typography
            component="p"
            variant="body1"
            sx={{
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '168%',
              textAlign: 'center',
              color: 'rgba(137, 200, 198, 0.8)',
            }}
          >
            Welcome Back
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
          <UIAuthTextField
            fullWidth
            size="small"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            autoComplete="new-password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon sx={{ color: '#83A9A8' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <VisibilityOffOutlinedIcon sx={{ color: '#DCE0E4' }} />
                    ) : (
                      <VisibilityOutlinedIcon sx={{ color: '#DCE0E4' }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Link href="/forgot-password">
            <Typography
              sx={{
                cursor: 'pointer',
                textAlign: 'right',
                color: '#83A9A8',
                fontWeight: 400,
                fontSize: 14,
                textDecoration: 'none',
              }}
            >
              Forgot password?
            </Typography>
          </Link>

          <Box
            sx={{
              paddingTop: '10px',
              alignSelf: 'center',
              width: 170,
            }}
          >
            <UIDefaultButton type="submit" disabled={loading}>
              {loading ? (
                <CircularProgress color="inherit" size={24} />
              ) : (
                'Log in'
              )}
            </UIDefaultButton>
          </Box>
        </Stack>
        <UIFlexColumnBox>
          <Box
            component="a"
            href="https://customer.elitegaming.rpatdev.com/"
            sx={{ textDecoration: 'none' }}
          >
            <Typography
              sx={{
                paddingTop: '15px',
                cursor: 'pointer',
                textAlign: 'right',
                color: '#83A9A8',
                fonSize: '14px',
                fontWeight: 500,
              }}
            >
              Customer Login
            </Typography>
          </Box>
        </UIFlexColumnBox>
      </UIAuthCardWrapper>
    </AuthLayout>
  );
};

export default LoginPage;
