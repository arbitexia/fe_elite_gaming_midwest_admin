import { Box, Divider, Typography, Stack, MenuItem } from '@mui/material';
import { UIFlexWrapBox, UIFlexSpaceBox } from '@/components/UI';
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
import ProfileHeader from './Header';
import { userRole, userStatus } from '@/_mock/users';
import { useFormik } from 'formik';

interface ProfileHeaderProps {
  user: UserType;
}

const ProfileEdit = ({ user }: ProfileHeaderProps) => {
  const userFormik = useFormik({
    initialValues: user,
    onSubmit: async (values) => {
      console.log(values);
      // await authorize({ variables: { ...values } });
    },
  });
  return (
    <Box component="form" onSubmit={userFormik.handleSubmit}>
      <ProfileHeader />
      <StyledUserInfoCard sx={{ height: '450px' }}>
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
            <label htmlFor="photo-upload">
              <StyledUserInfoAvatar src={user.asset} alt="avatar">
                <Typography
                  sx={{
                    width: '100px',
                    height: '22px',
                    background: 'rgba(0, 0, 0, 0.4)',
                    borderRadius: '4px',
                    fontWeight: '500',
                    fontSize: '12px',
                    lineHeight: '22px',
                    textAlign: 'center',
                    color: '#8C8787',
                  }}
                >
                  Edit Photo
                </Typography>
              </StyledUserInfoAvatar>
              <input
                id="photo-upload"
                // onChange={onAvatarChange}
                type="file"
                accept="image/png, image/gif, image/jpeg"
              />
            </label>
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

          <Box flexGrow="1">
            <UIFlexSpaceBox>
              <UIFlexWrapBox
                sx={{
                  gap: '10px',
                  alignItems: 'center',
                  marginBottom: '25px',
                }}
              >
                <StyledUserInfoTitle sx={{ width: 'auto' }}>
                  FirstName:{' '}
                </StyledUserInfoTitle>
                <StyledUserEditTextField
                  name="firstName"
                  value={userFormik.values.firstName}
                  onChange={userFormik.handleChange}
                />
                <StyledUserInfoTitle sx={{ width: 'auto' }}>
                  LastName:{' '}
                </StyledUserInfoTitle>
                <StyledUserEditTextField
                  name="lastName"
                  value={userFormik.values.lastName}
                  onChange={userFormik.handleChange}
                />
              </UIFlexWrapBox>
              <UIFlexWrapBox
                sx={{
                  alignItems: 'center',
                  marginRight: '80px',
                  marginBottom: '25px',
                }}
              >
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
            </UIFlexSpaceBox>
            <Divider />
            <UIFlexWrapBox sx={{ paddingTop: '20px' }}>
              <Stack direction="column" sx={{ width: '49%', gap: '10px' }}>
                <UIFlexWrapBox sx={{ alignItems: 'center', width: '370px' }}>
                  <StyledUserInfoTitle>Phonenumber:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="phonenumber"
                    value={userFormik.values.phonenumber}
                    onChange={userFormik.handleChange}
                  />
                </UIFlexWrapBox>
                <UIFlexWrapBox sx={{ alignItems: 'center', width: '370px' }}>
                  <StyledUserInfoTitle>Email:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="email"
                    value={userFormik.values.email}
                    onChange={userFormik.handleChange}
                  />
                </UIFlexWrapBox>
                <UIFlexWrapBox sx={{ alignItems: 'center', width: '370px' }}>
                  <StyledUserInfoTitle>Address1:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="location.address1"
                    value={userFormik.values.location.address1}
                    onChange={userFormik.handleChange}
                  />
                </UIFlexWrapBox>
                <UIFlexWrapBox sx={{ alignItems: 'center', width: '370px' }}>
                  <StyledUserInfoTitle>City:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="location.city"
                    value={userFormik.values.location.city}
                    onChange={userFormik.handleChange}
                  />
                </UIFlexWrapBox>
                <UIFlexWrapBox sx={{ alignItems: 'center', width: '370px' }}>
                  <StyledUserInfoTitle>ZipCode:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="location.zipcode"
                    value={userFormik.values.location.zipcode}
                    onChange={userFormik.handleChange}
                  />
                </UIFlexWrapBox>
              </Stack>
              <Stack direction="column" sx={{ width: '49%', gap: '10px' }}>
                <UIFlexWrapBox sx={{ alignItems: 'center', width: '370px' }}>
                  <StyledUserInfoTitle>Birthday:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="birthday"
                    value={userFormik.values.birthday}
                    onChange={userFormik.handleChange}
                  />
                </UIFlexWrapBox>
                <UIFlexWrapBox sx={{ alignItems: 'center', width: '370px' }}>
                  <StyledUserInfoTitle>User role:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="role"
                    value={userFormik.values.role}
                    onChange={userFormik.handleChange}
                    select
                  >
                    {userRole.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.value}
                        </MenuItem>
                      );
                    })}
                  </StyledUserEditTextField>
                </UIFlexWrapBox>
                <UIFlexWrapBox sx={{ alignItems: 'center', width: '370px' }}>
                  <StyledUserInfoTitle>Address2:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="location.address2"
                    value={userFormik.values.location.address2}
                    onChange={userFormik.handleChange}
                  />
                </UIFlexWrapBox>
                <UIFlexWrapBox sx={{ alignItems: 'center', width: '370px' }}>
                  <StyledUserInfoTitle>State:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="location.state"
                    value={userFormik.values.location.state}
                    onChange={userFormik.handleChange}
                  />
                </UIFlexWrapBox>
                <UIFlexWrapBox sx={{ alignItems: 'center', width: '370px' }}>
                  <StyledUserInfoTitle>Country:</StyledUserInfoTitle>
                  <StyledUserEditTextField
                    name="location.country"
                    value={userFormik.values.location.country}
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

export default ProfileEdit;
