import {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineConnector,
} from '@mui/lab';
import { Typography } from '@mui/material';
import {
  ShoppingCart,
  IntegrationInstructions,
  Notifications,
  CreditScore,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { UIFlexSpaceBox } from '@/components/UI';
import { StyledUserDetailCard, StyledUserRequestButton } from './ui';
import { guestActivityData } from '@/_mock/users';

const activityIcons = {
  ORDER: { icon: ShoppingCart, color: '#4299E1' },
  QUOTE: { icon: IntegrationInstructions, color: '#E53E3E' },
  INVITATION: { icon: Notifications, color: '#4FD1C5' },
  PAYMENT: { icon: CreditScore, color: '#F6AD55' },
};

const UserDetailActivityCard = () => {
  return (
    <StyledUserDetailCard>
      <UIFlexSpaceBox>
        <Typography
          sx={{
            ml: '15px',
            fontWeight: '600',
            fontSize: '18px',
            lineHeight: '17px',
            color: '#222B35',
          }}
        >
          Activities
        </Typography>
        <StyledUserRequestButton>View more</StyledUserRequestButton>
      </UIFlexSpaceBox>
      <Timeline
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginTop: '30px',
          '.MuiTimelineItem-root': {
            minHeight: '65px',
            '&::before': {
              padding: 0,
              flex: 0,
            },
          },
          '.MuiTimelineConnector-root': {
            width: '0.0111rem',
            background: '#889AAE',
            margin: '5px 0px',
          },
        }}
      >
        {guestActivityData.map((activity, index) => {
          const Icon = activityIcons[activity.model].icon;
          return (
            <TimelineItem key={index}>
              {index === guestActivityData.length - 1 ? (
                <Icon
                  fontSize="small"
                  sx={{ color: activityIcons[activity.model].color }}
                />
              ) : (
                <TimelineSeparator>
                  <Icon
                    fontSize="small"
                    sx={{ color: activityIcons[activity.model].color }}
                  />
                  <TimelineConnector />
                </TimelineSeparator>
              )}
              <TimelineContent
                sx={{
                  padding: '1px 16px',
                }}
              >
                <Typography
                  sx={{
                    color: '#222B35',
                    fontWeight: 600,
                    fontSize: '14px',
                    letterSpacing: '0.1px',
                  }}
                >
                  {activity.sentence}
                </Typography>
                <Typography
                  sx={{
                    color: '#889AAE',
                    fontWeight: 500,
                    fontSize: '12px',
                    letterSpacing: '0.1px',
                    textTransform: 'uppercase',
                  }}
                >
                  {format(new Date(), 'dd MMM KK:mm aa')}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    </StyledUserDetailCard>
  );
};

export default UserDetailActivityCard;
