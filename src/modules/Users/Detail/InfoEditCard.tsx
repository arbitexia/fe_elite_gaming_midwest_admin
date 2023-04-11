import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { Box, Divider, Typography, Stack, MenuItem } from '@mui/material';
import { userStatus } from '@/_mock/users';
import {
  UIFlexWrapBox,
  UIFlexSpaceBox,
  UIEditTextField,
  UIActionButton,
} from '@/components/UI';
import { UserRole } from '@/constants/enum';
import { useAsset, useAuth } from '@/hooks';
import { UpdateUserParam, UserType } from '@/types';

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

interface UsersDetailHeaderProps {
  user: UserType.User;
}

const UserDetailInfoCard = ({ user }: UsersDetailHeaderProps) => {
  const router = useRouter();
  const { slug } = router.query;
  const [uploadPhoto, setUploadPhoto] = useState<File>();
  const [selectedFile, setSelectedFile] = useState<string>();
  const appToast = useAppToast();

  const { onCreateNewUser, onUpdateUser } = useAuth({
    handleRegisterUserSuccess: () => {
      router.push('/users/customers');
    },
  });
  const { onCreateAsset } = useAsset();
  const userFormik = useFormik({
    initialValues: { ...user, birthday: '1991-10-10' },
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

  return (
    <Box component="form" onSubmit={userFormik.handleSubmit}>
      <UsersDetailHeader user={user} />
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
            <UIFlexSpaceBox
              sx={{
                alignItems: 'flex-end',
                gap: 3,
              }}
            >
              <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                <StyledUserInfoTitle sx={{ width: 'auto' }}>
                  FirstName:{' '}
                </StyledUserInfoTitle>
                <UIEditTextField
                  name="firstName"
                  value={userFormik.values.firstName}
                  onChange={userFormik.handleChange}
                  sx={{
                    width: '250px',
                  }}
                />
              </UIFlexWrapBox>
              <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                <StyledUserInfoTitle sx={{ width: 'auto' }}>
                  LastName:{' '}
                </StyledUserInfoTitle>
                <UIEditTextField
                  name="lastName"
                  value={userFormik.values.lastName}
                  onChange={userFormik.handleChange}
                  sx={{
                    width: '250px',
                  }}
                />
              </UIFlexWrapBox>
              <UIFlexWrapBox
                sx={{
                  alignItems: 'flex-end',
                }}
              >
                <UIEditTextField
                  name="status"
                  onChange={userFormik.handleChange}
                  value={userFormik.values.status}
                  select
                  sx={{
                    width: '250px',
                  }}
                >
                  {userStatus.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.value}
                      </MenuItem>
                    );
                  })}
                </UIEditTextField>
              </UIFlexWrapBox>
            </UIFlexSpaceBox>
            <Divider sx={{ mt: '25px' }} />
            <UIFlexWrapBox sx={{ paddingTop: '20px' }}>
              <Stack direction="column" sx={{ width: '49%', gap: '10px' }}>
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
                {/* <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>Address1:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="address.address1"
                    value={userFormik.values.address?.address1}
                    onChange={userFormik.handleChange}
                  />
                </UIFlexWrapBox>
                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>City:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="address.city"
                    value={userFormik.values.address?.city}
                    onChange={userFormik.handleChange}
                  />
                </UIFlexWrapBox>
                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>ZipCode:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="address.zipcode"
                    value={userFormik.values.address?.zipcode}
                    onChange={userFormik.handleChange}
                  />
                </UIFlexWrapBox> */}
              </Stack>
              <Stack direction="column" sx={{ width: '49%', gap: '10px' }}>
                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>Birthday:</StyledUserInfoTitle>
                  {/* <StyledUserEditTextField
                    name="birthday"
                    value={userFormik.values.birthday}
                    onChange={userFormik.handleChange}
                  /> */}
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
                          <StyledUserEditTextField
                            {...params}
                            placeholder="Birthday"
                          />
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
                {/* <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>Address2:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="address.address2"
                    value={userFormik.values.address?.address2}
                    onChange={userFormik.handleChange}
                  />
                </UIFlexWrapBox>
                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>State:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="address.state"
                    value={userFormik.values.address?.state}
                    onChange={userFormik.handleChange}
                  />
                </UIFlexWrapBox>
                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>Country:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="address.country"
                    value={userFormik.values.address?.country}
                    onChange={userFormik.handleChange}
                  />
                </UIFlexWrapBox> */}
              </Stack>
            </UIFlexWrapBox>
          </Box>
        </StyledUserInfoCardContent>
      </StyledUserInfoCard>
    </Box>
  );
};

export default UserDetailInfoCard;
