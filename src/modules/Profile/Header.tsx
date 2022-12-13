import { Box, Typography, Stack } from '@mui/material';
import { Edit as EditIcon, Replay as ReplayIcon } from '@mui/icons-material';
import { UIActionButton, UIDefaultButton } from '@/components/UI';
import { useRouter } from 'next/router';

const ProfileHeader = () => {
  const router = useRouter();
  return (
    <Box sx={{ mt: '35px', mb: '20px' }}>
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
            handleClick={() => console.log('ActionButton')}
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
