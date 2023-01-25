import { useRouter } from 'next/router';
import { UIFlexSpaceBox, UIItemCard } from '@/components/UI';
import { Box, Typography } from '@mui/material';
import { LocationType } from '@/types';
import {
  StyledLocationViewButton,
  StyledLocationEditButton,
  StyledImageBox,
} from './ui';

export type LocationsCardProps = {
  item: LocationType;
};

export const LocationsCard = ({ item }: LocationsCardProps) => {
  const router = useRouter();
  return (
    <UIItemCard sx={{ width: 254, height: 360 }}>
      <StyledImageBox>
        <Box
          component="img"
          src={
            item.gallery && item.gallery.length > 0
              ? item.gallery[0].asset?.url ?? ''
              : ''
          }
          width={220}
          height={160}
        />
      </StyledImageBox>
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
        {`${item.address?.address1 ?? ''} ${item.address?.address2 ?? ''} ${
          item.address?.city ?? ''
        } ${item.address?.state ?? ''} ${item.address?.zipcode ?? ''} ${
          item.address?.country ?? ''
        }`}
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
    </UIItemCard>
  );
};
