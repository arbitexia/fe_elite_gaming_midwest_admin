import { Box, Typography } from '@mui/material';
import { Replay as ReplayIcon } from '@mui/icons-material';
import {
  UIActionButton,
  UIDefaultButton,
  UIFlexSpaceBox,
  UIFlexWrapBox,
} from '@/components/UI';

type ProfileHeaderProps = {
  onChangePassword: () => void;
};
const ProfileHeader = ({ onChangePassword }: ProfileHeaderProps) => {
  return (
    <UIFlexSpaceBox>
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
      <UIFlexWrapBox sx={{ alignItems: 'center', gap: 2 }}>
        <UIActionButton
          icon={<ReplayIcon />}
          color="#667180"
          title="Change password"
          handleClick={onChangePassword}
        />
        <UIDefaultButton
          sx={{ minWidth: '110px', borderRadius: '8px' }}
          type="submit"
        >
          Save
        </UIDefaultButton>
      </UIFlexWrapBox>
    </UIFlexSpaceBox>
  );
};

export default ProfileHeader;
