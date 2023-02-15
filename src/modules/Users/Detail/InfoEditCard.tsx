import { Box, Divider, Typography, Stack, MenuItem } from '@mui/material';
import { UIFlexWrapBox } from '@/components/UI';
import { InputAdornment, IconButton } from '@mui/material';
import {
  VisibilityOffOutlined as VisibilityOffOutlinedIcon,
  VisibilityOutlined as VisibilityOutlinedIcon,
} from '@mui/icons-material';
import { UserType } from '@/types';
import {
  StyledUserInfoTitle,
  StyledUserInfoCard,
  StyledUserInfoCardHeader,
  StyledUserInfoAvatar,
  StyledUserInfoCardContent,
  StyledUserInfoCardStatus,
  StyledUserEditTextField,
} from './ui';
import UsersDetailHeader from './Header';
import { userStatus } from '@/_mock/users';
import { useFormik } from 'formik';
import { UserRole } from '@/constants/Enum';
import { useAsset, useUser } from '@/hooks';
import { convertMBtoBytes } from '@/libs/data-helper';
import { useAppToast } from '@/providers';
import { useState } from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { MobileDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Moment } from 'moment';
import { TextMaskCustom } from './TextMask';
import * as yup from 'yup';
import { useRouter } from 'next/router';

interface UsersDetailHeaderProps {
  user: UserType.User;
}

export const UserInfoCustomerSchema = yup.object({
  firstName: yup.string().required('FirstName is required'),
  lastName: yup.string().required('LastName is required'),
  userName: yup.string().required('UserName is required'),
  birthday: yup.string().required('Birthday is required'),
  email: yup
    .string()
    .required('Email is required')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, 'Invalid Email'),
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^\([0-9]{3}\) [0-9]{3} [0-9]{4}$/i, 'Phone number is not valid'),
  roleId: yup.number().required('User Role is required'),
  status: yup.string().required('Status is required'),
});

export const UserInfoCreateSchema = yup.object({
  firstName: yup.string().required('FirstName is required'),
  lastName: yup.string().required('LastName is required'),
  userName: yup.string().required('UserName is required'),
  birthday: yup.string().required('Birthday is required'),
  email: yup
    .string()
    .required('Email is required')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, 'Invalid Email'),
  roleId: yup.number().required('User Role is required'),
  status: yup.string().required('Status is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const UserDetailInfoCard = ({ user }: UsersDetailHeaderProps) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { slug } = router.query;
  const [imageUrl, setImageUrl] = useState(user.avatar?.url);
  const appToast = useAppToast();

  const { onUpdateUser } = useUser();
  const { onCreateAsset } = useAsset();
  const userFormik = useFormik({
    initialValues: user,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      let error = '';
      const validationSchema =
        user.id === 0 && slug != 'customers'
          ? UserInfoCreateSchema
          : UserInfoCustomerSchema;
      await validationSchema.validate(values).catch((e) => {
        error = e.message;
      });
      if (error) {
        appToast({
          severity: 'error',
          message: error,
        });
        return;
      }
      const input: any = {
        firstName: values.firstName,
        lastName: values.lastName,
        userName: values.userName,
        birthday: values.birthday,
        status: values.status ?? 'ACTIVATED',
        roleId: values.roleId,
      };
      if (values.assetId) input.assetId = values.assetId;
      if (values.email) input.email = values.email;
      if (values.phone) input.phone = values.phone.replace(/\D/g, '');
      if (values.location) input.location = values.location;
      if (values.password) input.password = values.password;
      await onUpdateUser({
        userId: user.id,
        input,
      });
      router.push(`/users/${slug}`);
    },
  });
  const onAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) return;

    // Restrict user to upload file less than 3.1MB
    if (file.size > convertMBtoBytes(3.1)) {
      appToast({ serverity: 'error', message: 'File size is too large' });
      return;
    }
    reader.onloadend = async () => {
      const asset = await onCreateAsset(file);
      userFormik.setFieldValue('assetId', asset.id);
      setImageUrl(asset.url);
    };

    reader.readAsDataURL(file);
  };
  return (
    <Box component="form" onSubmit={userFormik.handleSubmit}>
      <UsersDetailHeader user={user} />
      <StyledUserInfoCard>
        <StyledUserInfoCardHeader />
        <StyledUserInfoCardContent>
          {user.id !== 0 && (
            <StyledUserInfoCardStatus>
              <Typography
                sx={{
                  fontWeight: '400',
                  fontSize: '14px',
                  lineHeight: '22px',
                  color: '#667180',
                }}
              >
                ID #{user.id}
              </Typography>
            </StyledUserInfoCardStatus>
          )}
          <Box sx={{ input: { display: 'none' } }}>
            <Box
              sx={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <StyledUserInfoAvatar src={imageUrl} alt="avatar" />
              <label htmlFor="photo-upload">
                <Typography
                  sx={{
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    width: '197px',
                    height: '55px',
                    background: 'rgba(0, 0, 0, 0.4)',
                    fontWeight: '500',
                    fontSize: '12px',
                    lineHeight: '55px',
                    textAlign: 'center',
                    color: '#B0B0B0',
                    cursor: 'pointer',
                  }}
                >
                  Edit Photo
                </Typography>
                <input
                  id="photo-upload"
                  onChange={onAvatarChange}
                  type="file"
                  accept="image/png, image/gif, image/jpeg"
                />
              </label>
            </Box>

            <Typography
              sx={{
                mt: '20px',
                width: '186px',
                fontWeight: '400',
                fontSize: '12px',
                lineHeight: '15px',
                textAlign: 'center',
                color: '#82928F',
              }}
            >
              Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3.1 MB
            </Typography>
          </Box>

          <Box flex="1">
            <UIFlexWrapBox sx={{ paddingTop: '20px' }}>
              <Stack direction="column" sx={{ width: '49%', gap: '10px' }}>
                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>FirstName: </StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="firstName"
                    value={userFormik.values.firstName}
                    onChange={userFormik.handleChange}
                  />
                </UIFlexWrapBox>
                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>LastName: </StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="lastName"
                    value={userFormik.values.lastName}
                    onChange={userFormik.handleChange}
                  />
                </UIFlexWrapBox>
              </Stack>
              <Stack direction="column" sx={{ width: '49%', gap: '10px' }}>
                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>UserName: </StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="userName"
                    value={userFormik.values.userName}
                    onChange={userFormik.handleChange}
                  />
                </UIFlexWrapBox>
                <UIFlexWrapBox
                  sx={{
                    alignItems: 'center',
                  }}
                >
                  <StyledUserInfoTitle>Status:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="status"
                    onChange={userFormik.handleChange}
                    defaultValue="ACTIVATED"
                    value={userFormik.values.status}
                    select
                  >
                    {userStatus.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.value}
                        </MenuItem>
                      );
                    })}
                  </StyledUserEditTextField>
                </UIFlexWrapBox>
              </Stack>
            </UIFlexWrapBox>
            {user.id === 0 && slug != 'customers' && (
              <UIFlexWrapBox sx={{ paddingTop: '20px' }}>
                <Stack sx={{ width: '49%', gap: '10px' }}>
                  <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                    <StyledUserInfoTitle>Password:</StyledUserInfoTitle>
                    <StyledUserEditTextField
                      fullWidth
                      size="small"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      id="password"
                      name="password"
                      value={userFormik.values.password}
                      onChange={userFormik.handleChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <VisibilityOffOutlinedIcon
                                  sx={{ color: '#DCE0E4' }}
                                />
                              ) : (
                                <VisibilityOutlinedIcon
                                  sx={{ color: '#DCE0E4' }}
                                />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </UIFlexWrapBox>
                </Stack>
                <Stack sx={{ width: '49%', gap: '10px' }}>
                  <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                    <StyledUserInfoTitle>Confirm Password:</StyledUserInfoTitle>
                    <StyledUserEditTextField
                      fullWidth
                      size="small"
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={userFormik.values.confirmPassword}
                      onChange={userFormik.handleChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            >
                              {showConfirmPassword ? (
                                <VisibilityOffOutlinedIcon
                                  sx={{ color: '#DCE0E4' }}
                                />
                              ) : (
                                <VisibilityOutlinedIcon
                                  sx={{ color: '#DCE0E4' }}
                                />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </UIFlexWrapBox>
                </Stack>
              </UIFlexWrapBox>
            )}
            <Divider sx={{ mt: '25px' }} />
            <UIFlexWrapBox sx={{ paddingTop: '20px' }}>
              <Stack direction="column" sx={{ width: '49%', gap: '10px' }}>
                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>Phonenumber:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="phone"
                    value={userFormik.values.phone}
                    onChange={userFormik.handleChange}
                    InputProps={{
                      inputComponent: TextMaskCustom as any,
                    }}
                  />
                </UIFlexWrapBox>
                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>Email:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="email"
                    value={userFormik.values.email}
                    onChange={userFormik.handleChange}
                  />
                </UIFlexWrapBox>
                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>Address1:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="location.address1"
                    value={userFormik.values.location?.address1}
                    onChange={userFormik.handleChange}
                  />
                </UIFlexWrapBox>
                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>City:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="location.city"
                    value={userFormik.values.location?.city}
                    onChange={userFormik.handleChange}
                  />
                </UIFlexWrapBox>
                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>ZipCode:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="location.zipcode"
                    value={userFormik.values.location?.zipcode}
                    onChange={userFormik.handleChange}
                  />
                </UIFlexWrapBox>
              </Stack>
              <Stack direction="column" sx={{ width: '49%', gap: '10px' }}>
                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>Birthday:</StyledUserInfoTitle>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <MobileDatePicker
                      inputFormat="MM/DD/YYYY"
                      value={userFormik.values.birthday}
                      onChange={(value: Moment | null) => {
                        userFormik.setFieldValue(
                          'birthday',
                          value ? value.format('MM/DD/YYYY') : ''
                        );
                      }}
                      renderInput={(params) => {
                        return <StyledUserEditTextField {...params} />;
                      }}
                    />
                  </LocalizationProvider>
                </UIFlexWrapBox>
                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>User role:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="roleId"
                    defaultValue={1}
                    value={userFormik.values.roleId}
                    onChange={userFormik.handleChange}
                    select
                  >
                    {Object.values(UserRole).map((item, index) => {
                      return (
                        <MenuItem key={item} value={index + 1}>
                          {item}
                        </MenuItem>
                      );
                    })}
                  </StyledUserEditTextField>
                </UIFlexWrapBox>
                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>Address2:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="location.address2"
                    value={userFormik.values.location?.address2}
                    onChange={userFormik.handleChange}
                  />
                </UIFlexWrapBox>
                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>State:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="location.state"
                    value={userFormik.values.location?.state}
                    onChange={userFormik.handleChange}
                  />
                </UIFlexWrapBox>
                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>Country:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="location.country"
                    value={userFormik.values.location?.country}
                    onChange={userFormik.handleChange}
                  />
                </UIFlexWrapBox>
              </Stack>
            </UIFlexWrapBox>
          </Box>
        </StyledUserInfoCardContent>
      </StyledUserInfoCard>
    </Box>
  );
};

export default UserDetailInfoCard;
