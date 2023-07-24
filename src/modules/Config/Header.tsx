import { Typography, Stack } from '@mui/material';
import { UIFlexSpaceBox, UIDefaultButton } from '@/components/UI';

interface ConfigHeaderProps {
  onSave: () => void;
}
const ConfigHeader = ({ onSave }: ConfigHeaderProps) => {
  return (
    <UIFlexSpaceBox>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: 36,
          lineHeight: '54px',
          color: '#89C8C6',
        }}
      >
        Settings/Config
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <UIDefaultButton
          sx={{ minWidth: '110px', borderRadius: '8px' }}
          onClick={onSave}
        >
          Save
        </UIDefaultButton>
      </Stack>
    </UIFlexSpaceBox>
  );
};

export default ConfigHeader;
