import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
interface LocationsDetailThumbnailProps {
  index: number;
  activeStep: number;
  url: string;
  handleRemove: (index: number) => void;
}

const LocationsDetailThumbnail = ({
  index,
  activeStep,
  url,
  handleRemove,
}: LocationsDetailThumbnailProps) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <Box
      sx={{ position: 'relative' }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Box
        component="img"
        sx={{
          marginBottom: '15px',
          height: '60px',
          display: 'block',
          width: '100%',
          overflow: 'hidden',
          borderRadius: '4px',
          opacity: index === activeStep ? '100%' : '60%',
        }}
        src={`/${url}`}
        alt="image"
      />
      <IconButton
        sx={{
          display: isHover ? 'flex' : 'none',
          position: 'absolute',
          width: '16px',
          height: '16px',
          top: -8,
          right: -8,
          border: '1px solid #89C8C6',
          background: 'rgba(255, 255, 255, 1)',
        }}
        onClick={() => handleRemove(index)}
      >
        <Close sx={{ fontSize: 14 }} />
      </IconButton>
    </Box>
  );
};

export default LocationsDetailThumbnail;
