import {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineConnector,
} from '@mui/lab';
import { SvgIcon, Typography } from '@mui/material';
import {
  ShoppingCart,
  IntegrationInstructions,
  Notifications,
  CreditScore,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { UIFlexSpaceBox, UIFlexCenterBox } from '@/components/UI';
import { StyledUserDetailCard, StyledUserRequestButton } from './ui';
import { ActivityItemType } from '@/types';
import { useRouter } from 'next/router';

type SvgIconComponent = typeof SvgIcon;

type ActivityType = {
  icon: SvgIconComponent;
  color: string;
};

interface ActiveIconProps {
  ORDER: ActivityType;
  QUOTE: ActivityType;
  INVITATION: ActivityType;
  TRANSACTION: ActivityType;
  USER: ActivityType;
  REWARD: ActivityType;
  PRODUCT: ActivityType;
  ASSET: ActivityType;
  POINT: ActivityType;
  LOCATION: ActivityType;
  GALLERY: ActivityType;
}

const activityIcons: ActiveIconProps = {
  ORDER: { icon: ShoppingCart, color: '#4299E1' },
  QUOTE: { icon: IntegrationInstructions, color: '#E53E3E' },
  INVITATION: { icon: Notifications, color: '#4FD1C5' },
  TRANSACTION: { icon: CreditScore, color: '#F6AD55' },
  USER: { icon: CreditScore, color: '#F6AD55' },
  REWARD: { icon: CreditScore, color: '#F6AD55' },
  PRODUCT: { icon: ShoppingCart, color: '#4299E1' },
  ASSET: { icon: CreditScore, color: '#F6AD55' },
  POINT: { icon: ShoppingCart, color: '#4299E1' },
  LOCATION: { icon: CreditScore, color: '#F6AD55' },
  GALLERY: { icon: CreditScore, color: '#F6AD55' },
};
type UserDetailActivityCardProps = {
  activities: ActivityItemType[];
};
const UserDetailActivityCard = ({
  activities,
}: UserDetailActivityCardProps) => {
  const router = useRouter();
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
        <StyledUserRequestButton onClick={() => router.push('/activity')}>
          View more
        </StyledUserRequestButton>
      </UIFlexSpaceBox>
      {activities.length === 0 && (
        <UIFlexCenterBox>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            No Data Found
          </Typography>
        </UIFlexCenterBox>
      )}
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
        {activities?.map((activity, index) => {
          const Icon =
            activityIcons[activity.model as keyof ActiveIconProps]?.icon ??
            CreditScore;

          return (
            <TimelineItem key={index}>
              {index === activities.length - 1 ? (
                <Icon
                  fontSize="small"
                  sx={{
                    color:
                      activityIcons[activity.model as keyof ActiveIconProps]
                        ?.color ?? 'red',
                  }}
                />
              ) : (
                <TimelineSeparator>
                  <Icon
                    fontSize="small"
                    sx={{
                      color:
                        activityIcons[activity.model as keyof ActiveIconProps]
                          ?.color ?? 'red',
                    }}
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
                  {activity.model} - {activity.type}
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
                  {format(new Date(activity.createdAt), 'dd MMM KK:mm aa')}
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
