import { Box, Divider, Typography, Stack } from '@mui/material';
import { UIFlexWrapBox, UIChip } from '@/components/UI';
import { UserType } from '@/types';
import {
  StyledUserInfoTitle,
  StyledUserInfoValue,
  StyledUserInfoCard,
  StyledUserInfoCardHeader,
  StyledUserInfoAvatar,
  StyledUserInfoCardContent,
  StyledUserInfoCardStatus,
} from './ui';
import { getColor } from '@/libs/data-helper';
import { userStatus, userRole } from '@/_mock/users';
import ProfileHeader from './Header';

interface ProfileHeaderProps {
  user: UserType.MockUser;
}

const ProfileInfo = ({ user }: ProfileHeaderProps) => {
  return (
    <Box>
      <ProfileHeader />
      <StyledUserInfoCard sx={{ height: '360px' }}>
        <StyledUserInfoCardHeader />
        <StyledUserInfoCardContent>
          <StyledUserInfoCardStatus>
            <UIChip
              label={userStatus[user.status].value}
              color={getColor(userStatus[user.status].value)}
            />
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
          <StyledUserInfoAvatar src={user.asset} alt="avatar" />
          <Box flexGrow="1">
            <Typography
              sx={{
                py: '25px',
                fontWeight: 600,
                fontSize: '24px',
                lineHeight: '17px',
                color: '#222B35',
              }}
            >
              {`${user.firstName} ${user.lastName}`}
            </Typography>
            <Divider />
            <UIFlexWrapBox sx={{ paddingTop: '20px' }}>
              <Stack direction="column" sx={{ width: '49%', gap: '18px' }}>
                <UIFlexWrapBox>
                  <StyledUserInfoTitle>Phonenumber:</StyledUserInfoTitle>
                  <StyledUserInfoValue>{user.phone}</StyledUserInfoValue>
                </UIFlexWrapBox>
                <UIFlexWrapBox>
                  <StyledUserInfoTitle>Email:</StyledUserInfoTitle>
                  <StyledUserInfoValue>{user.email}</StyledUserInfoValue>
                </UIFlexWrapBox>
                <UIFlexWrapBox>
                  <StyledUserInfoTitle>Location:</StyledUserInfoTitle>
                  <StyledUserInfoValue>{`${user.address?.address1} ${user.address?.address2} ${user.address?.city} ${user.address?.state} ${user.address?.zipcode} ${user.address?.country}`}</StyledUserInfoValue>
                </UIFlexWrapBox>
              </Stack>
              <Stack direction="column" sx={{ width: '49%', gap: '18px' }}>
                <UIFlexWrapBox>
                  <StyledUserInfoTitle>Birthday:</StyledUserInfoTitle>
                  <StyledUserInfoValue>{user.birthday}</StyledUserInfoValue>
                </UIFlexWrapBox>
                <UIFlexWrapBox>
                  <StyledUserInfoTitle>User role:</StyledUserInfoTitle>
                  <StyledUserInfoValue>
                    {userRole[user.role - 1].value}
                  </StyledUserInfoValue>
                </UIFlexWrapBox>
              </Stack>
            </UIFlexWrapBox>
          </Box>
        </StyledUserInfoCardContent>
      </StyledUserInfoCard>
    </Box>
  );
};

export default ProfileInfo;
