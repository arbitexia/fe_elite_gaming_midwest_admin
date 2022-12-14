import { UIFlexSpaceBox, UIDefaultButton } from '@/components/UI';
import { Typography } from '@mui/material';

export type LocationDetailHeaderProps = {
  name: string;
  isEditable: boolean;
};

const LocationDetailHeader = ({
  name,
  isEditable,
}: LocationDetailHeaderProps) => {
  return (
    <UIFlexSpaceBox sx={{ mb: '35px', alignItems: 'center', gap: '12px' }}>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: 24,
          lineHeight: '17px',
          color: '#06251F',
        }}
      >
        {name}
      </Typography>
      {isEditable && <UIDefaultButton>Save</UIDefaultButton>}
    </UIFlexSpaceBox>
  );
};

export default LocationDetailHeader;
