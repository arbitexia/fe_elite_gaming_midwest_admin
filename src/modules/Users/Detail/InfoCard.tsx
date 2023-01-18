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
import UsersDetailHeader from './Header';

interface UsersDetailHeaderProps {
  user: UserType.User;
}

const UserDetailInfoCard = ({ user }: UsersDetailHeaderProps) => {
  return (
    <Box>
      <UsersDetailHeader user={user} />
      <StyledUserInfoCard>
        <StyledUserInfoCardHeader />
        <StyledUserInfoCardContent>
          <StyledUserInfoCardStatus>
            <UIChip
              label={user.status}
              color={getColor(user.status ?? 'Archived')}
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
          <StyledUserInfoAvatar src={user.avatar?.url} alt="avatar" />
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
              {user.fullName}
            </Typography>
            <Divider />
            <UIFlexWrapBox sx={{ paddingTop: '20px' }}>
              <Stack direction="column" sx={{ width: '49%', gap: '18px' }}>
                <Stack direction="row">
                  <StyledUserInfoTitle>Phonenumber:</StyledUserInfoTitle>
                  <StyledUserInfoValue>{user.phone}</StyledUserInfoValue>
                </Stack>
                <Stack direction="row">
                  <StyledUserInfoTitle>Email:</StyledUserInfoTitle>
                  <StyledUserInfoValue>{user.email}</StyledUserInfoValue>
                </Stack>
                <Stack direction="row">
                  <StyledUserInfoTitle>Location:</StyledUserInfoTitle>
                  <StyledUserInfoValue>{`${user.address?.address1} ${user.address?.address2} ${user.address?.city} ${user.address?.state} ${user.address?.zipcode} ${user.address?.country}`}</StyledUserInfoValue>
                </Stack>
              </Stack>
              <Stack direction="column" sx={{ width: '49%', gap: '18px' }}>
                <Stack direction="row">
                  <StyledUserInfoTitle>Birthday:</StyledUserInfoTitle>
                  <StyledUserInfoValue>{user.birthday}</StyledUserInfoValue>
                </Stack>
                <Stack direction="row">
                  <StyledUserInfoTitle>User role:</StyledUserInfoTitle>
                  <StyledUserInfoValue>{user.role?.name}</StyledUserInfoValue>
                </Stack>
                <Stack direction="row">
                  <StyledUserInfoTitle sx={{ alignItems: 'flex-end' }}>
                    Coupon:
                  </StyledUserInfoTitle>
                  <StyledUserInfoValue
                    sx={{ fontWeight: 600, fontSize: 20, marginTop: '-5px' }}
                  >
                    $11231
                  </StyledUserInfoValue>
                </Stack>
              </Stack>
            </UIFlexWrapBox>
          </Box>
        </StyledUserInfoCardContent>
      </StyledUserInfoCard>
    </Box>
  );
};

export default UserDetailInfoCard;
