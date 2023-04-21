import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Box, Divider, Typography, Stack } from '@mui/material';
import { UIFlexWrapBox } from '@/components/UI';
import { UserStatus } from '@/constants';
import { UpdateUserParam, UserType } from '@/types';
import ProfileHeader from './Header';
import {
  StyledUserInfoTitle,
  StyledUserInfoCard,
  StyledUserInfoCardHeader,
  StyledUserInfoAvatar,
  StyledUserInfoCardContent,
  StyledUserInfoCardStatus,
  StyledUserEditTextField,
} from './ui';
import { format } from 'date-fns';
import { convertMBtoBytes } from '@/libs/data-helper';
import { useAppToast } from '@/providers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { MobileDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Moment } from 'moment';

interface ProfileEditProps {
  user: UserType.User;
  onEdit: (value: UpdateUserParam) => void;
  onChangePassword: () => void;
}

const ProfileEdit = ({ user, onEdit, onChangePassword }: ProfileEditProps) => {
  const [uploadPhoto, setUploadPhoto] = useState<File>();
  const [selectedFile, setSelectedFile] = useState<string>();
  const appToast = useAppToast();

  const profileFormik = useFormik({
    initialValues: user,
    onSubmit: async (values) => {
      const dataToSave: UpdateUserParam = {
        userId: Number(user.id),
        input: {
          id: Number(user.id),
          firstName: values.firstName,
          lastName: values.lastName,
          userName: `${values.firstName}${values.lastName}`,
          email: values.email,
          phone: values.phone,
          address: values.address,
          birthday: values.birthday,
          status: UserStatus.ACTIVATED,
        },
        uploadPhoto,
      };
      onEdit(dataToSave);
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
    <Box component="form" onSubmit={profileFormik.handleSubmit}>
      <ProfileHeader onChangePassword={onChangePassword} />
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
            <UIFlexWrapBox>
              <UIFlexWrapBox sx={{ width: '49%', alignItems: 'center' }}>
                <StyledUserInfoTitle>FirstName: </StyledUserInfoTitle>
                <StyledUserEditTextField
                  name="firstName"
                  value={profileFormik.values.firstName}
                  onChange={profileFormik.handleChange}
                />
              </UIFlexWrapBox>
              <UIFlexWrapBox sx={{ width: '49%', alignItems: 'center' }}>
                <StyledUserInfoTitle>LastName: </StyledUserInfoTitle>
                <StyledUserEditTextField
                  name="lastName"
                  value={profileFormik.values.lastName}
                  onChange={profileFormik.handleChange}
                />
              </UIFlexWrapBox>
            </UIFlexWrapBox>
            <Divider sx={{ mt: '25px' }} />
            <UIFlexWrapBox sx={{ paddingTop: '20px' }}>
              <Stack direction="column" sx={{ width: '49%', gap: '10px' }}>
                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>Phone number:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="phone"
                    type="number"
                    value={profileFormik.values.phone}
                    onChange={profileFormik.handleChange}
                  />
                </UIFlexWrapBox>
                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>Email:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="email"
                    value={profileFormik.values.email}
                    onChange={profileFormik.handleChange}
                  />
                </UIFlexWrapBox>
                {/* <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>Address1:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="address.address1"
                    value={profileFormik.values.address?.address1 ?? ''}
                    onChange={profileFormik.handleChange}
                  />
                </UIFlexWrapBox> */}
                {/* <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>City:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="address.city"
                    value={profileFormik.values.address?.city ?? ''}
                    onChange={profileFormik.handleChange}
                  />
                </UIFlexWrapBox>
                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>ZipCode:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="address.zipcode"
                    value={profileFormik.values.address?.zipcode ?? ''}
                    onChange={profileFormik.handleChange}
                  />
                </UIFlexWrapBox> */}
              </Stack>
              <Stack direction="column" sx={{ width: '49%', gap: '10px' }}>
                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>Birthday:</StyledUserInfoTitle>
                  {/* <StyledUserEditTextField
                    name="birthday"
                    value={
                      format(
                        new Date(profileFormik.values.birthday),
                        'yyyy-MM-dd hh:mm'
                      ) ?? ''
                    }
                    onChange={profileFormik.handleChange}
                  /> */}
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <MobileDatePicker
                      inputFormat="MM/DD/YYYY"
                      value={profileFormik.values.birthday}
                      onChange={(value: Moment | null) => {
                        profileFormik.setFieldValue(
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
                {/* <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>Address2:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="address.address2"
                    value={profileFormik.values.address?.address2 ?? ''}
                    onChange={profileFormik.handleChange}
                  />
                </UIFlexWrapBox>
                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>State:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="address.state"
                    value={profileFormik.values.address?.state ?? ''}
                    onChange={profileFormik.handleChange}
                  />
                </UIFlexWrapBox> */}
                {/* <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>Country:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="address.country"
                    value={profileFormik.values.address?.country ?? ''}
                    onChange={profileFormik.handleChange}
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

export default ProfileEdit;
