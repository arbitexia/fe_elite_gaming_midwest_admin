import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Box, Divider, Typography, InputAdornment } from '@mui/material';
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
import { convertMBtoBytes } from '@/libs/data-helper';
import { useAppToast } from '@/providers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { MobileDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Moment } from 'moment';
import { CalendarToday as CalendarTodayIcon } from '@mui/icons-material';
import { ProfileSchema } from '@/libs/yupSchema';

interface ProfileEditProps {
  user: UserType.User;
  onEdit: (value: UpdateUserParam) => void;
  onChangePassword: () => void;
}

const ProfileEdit = ({ user, onEdit, onChangePassword }: ProfileEditProps) => {
  const [uploadPhoto, setUploadPhoto] = useState<File>();
  const [selectedFile, setSelectedFile] = useState<string>();
  const [errorMsg, setErrorMsg] = useState<string>();
  const appToast = useAppToast();

  const profileFormik = useFormik({
    initialValues: user,
    validationSchema: ProfileSchema,
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

  useEffect(() => {
    if (errorMsg) {
      appToast({
        severity: 'error',
        message: errorMsg,
      });
      setErrorMsg(undefined);
    }
  }, [errorMsg]);

  const handleClickSave = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (JSON.stringify(profileFormik.errors) !== '{}') {
      const errorKey = Object.keys(
        profileFormik.errors
      )[0] as keyof typeof profileFormik.errors;
      setErrorMsg(profileFormik.errors[errorKey] as string | undefined);
      return;
    }
    profileFormik.handleSubmit();
  };

  return (
    <Box component="form" onSubmit={handleClickSave}>
      <ProfileHeader onChangePassword={onChangePassword} />
      <Divider sx={{ mt: '12px', mb: '24px' }} />
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

          <Box flex="1" sx={{ mt: 2 }}>
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

            <UIFlexWrapBox sx={{ mt: 3 }}>
              <UIFlexWrapBox sx={{ width: '49%', alignItems: 'center' }}>
                <StyledUserInfoTitle>Phone number:</StyledUserInfoTitle>
                <StyledUserEditTextField
                  name="phone"
                  type="number"
                  value={profileFormik.values.phone}
                  onChange={profileFormik.handleChange}
                />
              </UIFlexWrapBox>
              <UIFlexWrapBox sx={{ width: '49%', alignItems: 'center' }}>
                <StyledUserInfoTitle>Email:</StyledUserInfoTitle>
                <StyledUserEditTextField
                  name="email"
                  value={profileFormik.values.email}
                  onChange={profileFormik.handleChange}
                />
              </UIFlexWrapBox>
            </UIFlexWrapBox>

            <UIFlexWrapBox sx={{ mt: 3 }}>
              <UIFlexWrapBox sx={{ width: '49%', alignItems: 'center' }}>
                <StyledUserInfoTitle>Birthday:</StyledUserInfoTitle>
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
            </UIFlexWrapBox>
          </Box>
        </StyledUserInfoCardContent>
      </StyledUserInfoCard>
    </Box>
  );
};

export default ProfileEdit;
