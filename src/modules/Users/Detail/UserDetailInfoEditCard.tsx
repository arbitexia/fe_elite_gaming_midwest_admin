import { Box, Divider, Typography, Stack, MenuItem } from '@mui/material';
import { UIFlexWrapBox } from '@/components/UI';
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
import { userRole, userStatus } from '@/_mock/users';

interface UsersDetailHeaderProps {
  user: UserType;
}

const UserDetailInfoCard = ({ user }: UsersDetailHeaderProps) => {
  return (
    <StyledUserInfoCard sx={{ height: '360px' }}>
      <StyledUserInfoCardHeader />
      <StyledUserInfoCardContent>
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
          <StyledUserEditTextField
            value={user.name}
            sx={{
              width: '300px',
              height: '50px',
              input: { fontSize: 24 },
              margin: '6px 0 13px 0 ',
            }}
          />
          <Divider />
          <UIFlexWrapBox sx={{ paddingTop: '20px' }}>
            <Stack direction="column" sx={{ width: '49%', gap: '10px' }}>
              <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                <StyledUserInfoTitle>Mobile:</StyledUserInfoTitle>
                <StyledUserEditTextField value={user.phonenumber} />
              </UIFlexWrapBox>
              <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                <StyledUserInfoTitle>Email:</StyledUserInfoTitle>
                <StyledUserEditTextField value={user.email} />
              </UIFlexWrapBox>
              <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                <StyledUserInfoTitle>Location:</StyledUserInfoTitle>
                <StyledUserEditTextField
                  maxRows={2}
                  multiline
                  value={user.location}
                />
              </UIFlexWrapBox>
            </Stack>
            <Stack direction="column" sx={{ width: '49%', gap: '10px' }}>
              <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                <StyledUserInfoTitle>Birthday:</StyledUserInfoTitle>
                <StyledUserEditTextField value={user.birthday} />
              </UIFlexWrapBox>
              <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                <StyledUserInfoTitle>User role:</StyledUserInfoTitle>
                <StyledUserEditTextField value={user.role} select>
                  {userRole.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.value}
                      </MenuItem>
                    );
                  })}
                </StyledUserEditTextField>
              </UIFlexWrapBox>
              <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                <StyledUserInfoTitle>User Status:</StyledUserInfoTitle>
                <StyledUserEditTextField value={user.status} select>
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
        </Box>
      </StyledUserInfoCardContent>
    </StyledUserInfoCard>
  );
};

export default UserDetailInfoCard;
