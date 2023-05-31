import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import { userStatus } from '@/constants/user';
import { UIFlexWrapBox, UIActionButton } from '@/components/UI';
import { UserRole } from '@/constants/enum';
import { useAsset, useAuth } from '@/hooks';
import { UpdateUserParam, UserType } from '@/types';
import { CalendarToday as CalendarTodayIcon } from '@mui/icons-material';

import {
  StyledUserInfoTitle,
  StyledUserInfoCard,
  StyledUserInfoCardHeader,
  StyledUserInfoAvatar,
  StyledUserInfoCardContent,
  StyledUserInfoCardStatus,
  StyledUserEditTextField,
} from './ui';
import { UsersDetailHeader } from '@/modules/Users';
import {
  convertMBtoBytes,
  formatPhoneNumber,
  phoneNumberToString,
} from '@/libs/data-helper';
import { useAppToast } from '@/providers';
import { Delete } from '@mui/icons-material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { MobileDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Moment } from 'moment';
import { UserSchema } from '@/libs/yupSchema';

interface UsersDetailHeaderProps {
  user: UserType.User;
}

const UserDetailInfoCard = ({ user }: UsersDetailHeaderProps) => {
  const router = useRouter();
  const { slug } = router.query;
  const [uploadPhoto, setUploadPhoto] = useState<File>();
  const [selectedFile, setSelectedFile] = useState<string>();
  const [errorMsg, setErrorMsg] = useState<string>();
  const appToast = useAppToast();

  const { onCreateNewUser, onUpdateUser } = useAuth({
    handleRegisterUserSuccess: () => {
      router.push('/users/customers');
    },
  });
  const { onCreateAsset } = useAsset();
  const userFormik = useFormik({
    initialValues: user,
    validationSchema: UserSchema,
    onSubmit: async (values) => {
      const assetData = uploadPhoto
        ? await onCreateAsset(uploadPhoto)
        : undefined;
      if (user?.id) {
        const dataToUpdate: UpdateUserParam = {
          userId: user.id,
          input: { ...values, avatar: assetData },
        };
        await onUpdateUser(dataToUpdate);
        appToast({ severity: 'success', message: 'Success!' });
        router.push(`/users/${slug}`);
      } else {
        await onCreateNewUser({
          user: {
            ...values,
            phone: phoneNumberToString(values.phone),
            avatar: assetData,
          },
        });
      }
    },
  });  
  const onAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) return;
    // Restrict user to upload file less than 3.1MB
    if (file.size > convertMBtoBytes(3.1)) {
      appToast('error', 'File size is too large');
      return;
    }
    reader.onloadend = async () => {
      setUploadPhoto(file);
      setSelectedFile(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (errorMsg) {
      appToast({
        severity: 'error',
        message: errorMsg,
      });
      setErrorMsg(undefined);
    }
  }, [errorMsg]);

  const handleClickSave = () => {
    if (JSON.stringify(userFormik.errors) !== '{}') {
      const errorKey = Object.keys(
        userFormik.errors
      )[0] as keyof typeof userFormik.errors;
      setErrorMsg(userFormik.errors[errorKey] as string | undefined);
      return;
    }
    userFormik.handleSubmit();
  };
  return (
    <Box>
      <UsersDetailHeader user={user} onSave={handleClickSave} />
      <Divider sx={{ my: '18px' }} />
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
              <StyledUserInfoAvatar
                src={selectedFile ?? user.avatar?.url}
                alt="avatar"
              />
              {selectedFile && (
                <Box
                  sx={{ position: 'absolute', zIndex: 3, right: -12, top: 8 }}
                >
                  <UIActionButton
                    icon={<Delete />}
                    color="#F14336"
                    title=""
                    handleClick={() => setSelectedFile(undefined)}
                    size={24}
                  />
                </Box>
              )}
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
                  <StyledUserInfoTitle>FirstName:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="firstName"
                    value={userFormik.values.firstName}
                    onChange={userFormik.handleChange}
                  />
                </UIFlexWrapBox>
                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>Phone:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="phone"
                    value={formatPhoneNumber(userFormik.values.phone)}
                    onChange={userFormik.handleChange}
                    disabled={user?.id > 0 ? true : false}
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
                  <StyledUserInfoTitle>Status:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="status"
                    onChange={userFormik.handleChange}
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
              <Stack direction="column" sx={{ width: '49%', gap: '10px' }}>
                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>LastName:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="lastName"
                    value={userFormik.values.lastName}
                    onChange={userFormik.handleChange}
                  />
                </UIFlexWrapBox>
                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>Username:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="userName"
                    value={userFormik.values.userName}
                    onChange={userFormik.handleChange}
                  />
                </UIFlexWrapBox>
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
                        return (
                          <Box sx={{ position: 'relative' }}>
                            <StyledUserEditTextField
                              {...params}
                              placeholder="MM/DD/YYYY"
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <CalendarTodayIcon />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Box>
                        );
                      }}
                    />
                  </LocalizationProvider>
                </UIFlexWrapBox>
                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>User role:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="roleId"
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
              </Stack>
            </UIFlexWrapBox>
          </Box>
        </StyledUserInfoCardContent>
      </StyledUserInfoCard>
    </Box>
  );
};

export default UserDetailInfoCard;
