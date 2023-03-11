import { Typography, Stack } from '@mui/material';
import { UIFlexWrapBox } from '@/components/UI';
import { Product } from '@/types';
import {
  StyledLocationCardBox,
  StyledLocationInfoTitle,
  StyledLocationInfoValue,
} from './ui';

const RewardsDetailInfoCard = ({ productItem }: { productItem: Product }) => {
  return (
    <StyledLocationCardBox>
      <Typography
        sx={{
          fontWeight: '600',
          fontSize: '18px',
          lineHeight: '17px',
          color: '#222B35',
        }}
      >
        Information:
      </Typography>
      <UIFlexWrapBox sx={{ paddingTop: '20px' }}>
        <Stack direction="column" sx={{ flex: '1 1 0', gap: '18px' }}>
          <UIFlexWrapBox>
            <StyledLocationInfoTitle>Points:</StyledLocationInfoTitle>
            <StyledLocationInfoValue>
              {productItem.name}
            </StyledLocationInfoValue>
          </UIFlexWrapBox>
          <UIFlexWrapBox>
            <StyledLocationInfoTitle>Location:</StyledLocationInfoTitle>
            <StyledLocationInfoValue>
              {productItem.location?.name}
            </StyledLocationInfoValue>
          </UIFlexWrapBox>
          <UIFlexWrapBox>
            <StyledLocationInfoTitle>Description:</StyledLocationInfoTitle>
            <StyledLocationInfoValue>
              {productItem.description}
            </StyledLocationInfoValue>
          </UIFlexWrapBox>
        </Stack>
        <Stack direction="column" sx={{ flex: '1 1 0', gap: '18px' }}>
          <UIFlexWrapBox>
            <StyledLocationInfoTitle>Amount:</StyledLocationInfoTitle>
            <StyledLocationInfoValue>
              {productItem.amount}
            </StyledLocationInfoValue>
          </UIFlexWrapBox>
        </Stack>
      </UIFlexWrapBox>
    </StyledLocationCardBox>
  );
};

export default RewardsDetailInfoCard;
