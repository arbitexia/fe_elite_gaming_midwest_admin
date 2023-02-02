import { Typography, Stack } from '@mui/material';
import { UIFlexWrapBox } from '@/components/UI';
import {
  StyledLocationCardBox,
  StyledLocationInfoTitle,
  StyledLocationInfoValue,
} from './ui';
import { RewardsDetailProps } from '@/types';

const RewardsDetailInfoCard = ({ rewardsItem }: RewardsDetailProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

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
              {rewardsItem.name}
            </StyledLocationInfoValue>
          </UIFlexWrapBox>
          <UIFlexWrapBox>
            <StyledLocationInfoTitle>Location:</StyledLocationInfoTitle>
            <StyledLocationInfoValue>
              {rewardsItem.location?.name}
            </StyledLocationInfoValue>
          </UIFlexWrapBox>
          <UIFlexWrapBox>
            <StyledLocationInfoTitle>Description:</StyledLocationInfoTitle>
            <StyledLocationInfoValue>
              {rewardsItem.description}
            </StyledLocationInfoValue>
          </UIFlexWrapBox>
        </Stack>
        <Stack direction="column" sx={{ flex: '1 1 0', gap: '18px' }}>
          <UIFlexWrapBox>
            <StyledLocationInfoTitle>Amount:</StyledLocationInfoTitle>
            <StyledLocationInfoValue>
              {rewardsItem.amount}
            </StyledLocationInfoValue>
          </UIFlexWrapBox>
        </Stack>
      </UIFlexWrapBox>
    </StyledLocationCardBox>
  );
};

export default RewardsDetailInfoCard;
