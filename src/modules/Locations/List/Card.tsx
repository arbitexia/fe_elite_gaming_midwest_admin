import { useRouter } from 'next/router';
import { UIImage, UIFlexSpaceBox } from '@/components/UI';
import { Box, Typography } from '@mui/material';
import { LocationType } from '@/types';
import {
  StyledCardBox,
  StyledLocationViewButton,
  StyledLocationEditButton,
} from './ui';

export type LocationsCardProps = {
  item: LocationType;
};

export const LocationsCard = ({ item }: LocationsCardProps) => {
  const router = useRouter();
  return (
    <StyledCardBox>
      <Box
        sx={{
          padding: 0,
          borderRadius: '6px',
          height: '150px',
          overflow: 'hidden',
        }}
      >
        <UIImage src={item.urls[0]} width={220} height={160} />
      </Box>
      <Typography
        sx={{
          mt: '30px',
          fontWeight: '600',
          fontSize: '18px',
          lineHeight: '22px',
          color: 'gba(5, 34, 33, 0.8)',
        }}
      >
        {item.name}
      </Typography>
      <Typography
        sx={{
          mt: '15px',
          fontWeight: '600',
          fontSize: '12px',
          lineHeight: '16px',
          color: '#83A9A8',
        }}
      >
        Location:
      </Typography>
      <Typography
        sx={{
          fontWeight: '600',
          fontSize: '12px',
          lineHeight: '16px',
          color: 'rgba(0, 0, 0, 0.3)',
        }}
      >
        {item.location}
      </Typography>
      <UIFlexSpaceBox sx={{ marginTop: '30px' }}>
        <StyledLocationViewButton
          onClick={() => router.push(`/locations/${item.id}`)}
        >
          View
        </StyledLocationViewButton>
        <StyledLocationEditButton
          onClick={() => router.push(`/locations/edit/${item.id}`)}
        >
          Edit
        </StyledLocationEditButton>
      </UIFlexSpaceBox>
    </StyledCardBox>
  );
};
