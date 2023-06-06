import { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@mui/material';
import {
  LockOutlined as LockOutlinedIcon,
  VisibilityOutlined as VisibilityOutlinedIcon,
  VisibilityOffOutlined as VisibilityOffOutlinedIcon,
} from '@mui/icons-material';
import {
  UIAuthCardWrapper,
  UIImage,
  UIAuthTextField,
  UIDefaultButton,
} from '@/components/UI';
import { AuthLayout } from '@/layouts';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '@/hooks';
import { useRouter } from 'next/router';
import { ResetPasswordSchema } from '@/libs/yupSchema';

type ResetPasswordValue = {
  password: string;
};

const ResetPassword = () => {
  const router = useRouter();
  const { onResetPassword } = useAuth({
    handleAuthResetSuccess: () => {
      router.push('/login');
    },
  });
  const loading = false;
  const { token } = router.query;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values: ResetPasswordValue) => {
      onResetPassword(token as string, values.password);
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
            Change password
          </Typography>

          <Typography
            sx={{
              textAlign: 'center',
              fontSize: '14px',
              color: '#B3B3B3',
              marginTop: 2,
            }}
          >
            Input your new desired password in the input fields below to create
            a new password.
          </Typography>
        </Box>
        <Stack spacing={2.5} component="form" onSubmit={formik.handleSubmit}>
          <UIAuthTextField
            fullWidth
            size="small"
            placeholder="Password"
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
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

          <UIAuthTextField
            fullWidth
            size="small"
            placeholder="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon sx={{ color: '#83A9A8' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <VisibilityOffOutlinedIcon sx={{ color: '#DCE0E4' }} />
                    ) : (
                      <VisibilityOutlinedIcon sx={{ color: '#DCE0E4' }} />
                    )}
                  </IconButton>
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
            <UIDefaultButton type="submit" disabled={loading}>
              {loading ? (
                <CircularProgress color="inherit" size={24} />
              ) : (
                'Change Password'
              )}
            </UIDefaultButton>
          </Box>
        </Stack>
      </UIAuthCardWrapper>
    </AuthLayout>
  );
};

export default ResetPassword;
