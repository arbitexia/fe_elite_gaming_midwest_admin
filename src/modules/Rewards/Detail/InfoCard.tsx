import { Typography, Stack, Box } from '@mui/material';
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
              {rewardsItem.point}
            </StyledLocationInfoValue>
          </UIFlexWrapBox>
          <UIFlexWrapBox>
            <StyledLocationInfoTitle>Location:</StyledLocationInfoTitle>
            <StyledLocationInfoValue>
              {rewardsItem.location?.name}
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
        <Box
          sx={{
            width: '100%',
            paddingTop: '20px',
          }}
        >
          <StyledLocationInfoTitle>Short:</StyledLocationInfoTitle>
          <Box>
            <StyledLocationInfoValue>
              {rewardsItem.short}
            </StyledLocationInfoValue>
          </Box>
        </Box>
        <Box
          sx={{
            width: '100%',
            paddingTop: '20px',
          }}
        >
          <StyledLocationInfoTitle>Description:</StyledLocationInfoTitle>
          <Box>
            <div
              dangerouslySetInnerHTML={{ __html: rewardsItem.description }}
            ></div>
          </Box>
        </Box>
      </UIFlexWrapBox>
    </StyledLocationCardBox>
  );
};

export default RewardsDetailInfoCard;
