import { Box, Typography, Stack } from '@mui/material';
import { Replay as ReplayIcon } from '@mui/icons-material';
import { UIActionButton, UIDefaultButton } from '@/components/UI';

type ProfileHeaderProps = {
  onChangePassword: () => void;
};
const ProfileHeader = ({ onChangePassword }: ProfileHeaderProps) => {
  return (
    <Box sx={{ mb: '20px' }}>
      <Typography
        sx={{
          fontWeight: '600',
          fontSize: '36px',
          lineHeight: '54px',
          alignItems: 'center',
          color: '#89C8C6',
        }}
      >
        Profile
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <UIActionButton
            icon={<ReplayIcon />}
            color="#667180"
            title="Change password"
            handleClick={onChangePassword}
          />
          <UIDefaultButton sx={{ marginLeft: '8px' }} type="submit">
            Save
          </UIDefaultButton>
        </Box>
      </Stack>
    </Box>
  );
};

export default ProfileHeader;
