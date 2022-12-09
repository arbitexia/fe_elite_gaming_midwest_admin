import { Box, Typography, Stack } from '@mui/material';
import { Edit as EditIcon, Replay as ReplayIcon } from '@mui/icons-material';
import { UIActionButton, UIDefaultButton } from '@/components/UI';
import { useRouter } from 'next/router';

const ProfileHeader = () => {
  const router = useRouter();
  return (
    <Box sx={{ marginBottom: '20px' }}>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: 24,
          lineHeight: '17px',
          color: '#06251F',
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
          {router.asPath.includes('edit') ? (
            <UIDefaultButton sx={{ marginLeft: '8px' }} type="submit">
              Save
            </UIDefaultButton>
          ) : (
            <UIActionButton
              icon={<EditIcon />}
              color="#28B446"
              title="Edit"
              handleClick={() => {
                router.push(`/profile/edit`);
              }}
            />
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default ProfileHeader;
