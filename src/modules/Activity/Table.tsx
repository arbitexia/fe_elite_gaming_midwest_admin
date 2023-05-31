import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Link from 'next/link';
import {
  Table,
  TableHead,
  TableBody,
  TableSortLabel,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import { ActivityItemType, UserType } from '@/types';
import { StyledTableRow, StyledTableCell } from './ui';
import {
  UIFlexWrapBox,
  UIInfoValue,
  UIOptionMenu,
  UIOptionMenuItem,
  UIOptionMenuItemText,
} from '@/components/UI';

import {
  Loyalty as LoyaltyIcon,
  MergeType as TypeIcon,
  HighlightOff as FailedIcon,
  CheckCircle as SucceedIcon,
  Interests as ModelIcon,
  LocationOn as LocationIcon,
  Description as DescriptionIcon,
  AccessTime as AccessTimeIcon,
  EmailOutlined as EmailOutlinedIcon,
  PermIdentity as PermIdentityIcon,
  PhoneOutlined as PhoneOutlinedIcon,
  MoreHoriz as MoreHorizIcon,
} from '@mui/icons-material';
import { formatPhoneNumber } from '@/libs/data-helper';
import ConfirmModal from '@/components/App/Modal/ConfirmModal';
import { menuActivityActions } from '@/constants/user';
import { ActivityModel } from '@/constants';
import { useTablet } from '@/hooks';

type ActivityTableProps = {
  activityTableData: ActivityItemType[];
  onSort: (value: string) => void;
  onDelete: (value: ActivityItemType) => void;
};
type Order = 'asc' | 'desc';

const ActivityTable = ({
  activityTableData,
  onSort,
  onDelete,
}: ActivityTableProps) => {
  const { tablets, onGetTablets } = useTablet();
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<keyof ActivityItemType>('id');
  const [anchorElOptionsMenu, setAnchorElOptionsMenu] =
    useState<null | HTMLElement>(null);
  const [selectedActivity, setSelectedActivity] = useState<ActivityItemType>();
  const isOptionsMenuOpen = Boolean(anchorElOptionsMenu);
  useEffect(() => {
    if (tablets.length <= 0) {
      onGetTablets({
        filterBy: {
          status: 'ALL',
        },
      });
    }
  }, []);
  const handleClickMenuAction = (key: string) => {
    const selectedId = parseInt(
      anchorElOptionsMenu?.getAttribute('data-key') ?? '0'
    );
    const selectedItem = activityTableData.find((a) => a.id === selectedId);
    if (selectedItem) {
      setSelectedActivity(selectedItem);
    }
  };

  const createSortHandler =
    (property: keyof ActivityItemType) =>
    (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof ActivityItemType
  ) => {
    const newOrder = orderBy === property && order === 'asc' ? 'desc' : 'asc';
    setOrder(newOrder);
    setOrderBy(property);
    onSort(`${property}|${newOrder}`);
  };

  const renderUser = (user?: UserType.User) => {
    if (user) {
      return (
        <Box sx={{ color: '#000', justifyContent: 'flex-start' }}>
          <UIFlexWrapBox sx={{ alignItems: 'center' }}>
            <PermIdentityIcon sx={{ fontSize: '16px' }} />
            <Typography
              variant="body2"
              component={Link}
              href={`/users/customers/${user.id}`}
            >
              <a target="_blank">
                {user.firstName} {user.lastName}
              </a>
            </Typography>
          </UIFlexWrapBox>
          <UIFlexWrapBox sx={{ alignItems: 'center' }}>
            <EmailOutlinedIcon sx={{ fontSize: '16px' }} />
            <UIInfoValue variant="caption">{user.email}</UIInfoValue>
          </UIFlexWrapBox>
          <UIFlexWrapBox sx={{ alignItems: 'center' }}>
            <PhoneOutlinedIcon sx={{ fontSize: '16px' }} />
            <UIInfoValue variant="caption">
              {formatPhoneNumber(user.phone)}
            </UIInfoValue>
          </UIFlexWrapBox>
          <UIFlexWrapBox sx={{ alignItems: 'center' }}>
            <LoyaltyIcon sx={{ fontSize: '16px' }} />
            <UIInfoValue variant="caption">{user.status}</UIInfoValue>
          </UIFlexWrapBox>
          <UIFlexWrapBox sx={{ alignItems: 'center' }}>
            <AccessTimeIcon sx={{ fontSize: '16px' }} />
            <UIInfoValue variant="caption">
              {format(new Date(user?.createdAt || ''), 'dd MMM KK:mm aa')}
            </UIInfoValue>
          </UIFlexWrapBox>
        </Box>
      );
    } else {
      return <></>;
    }
  };

  const renderTablet = (tabletId?: number) => {
    if (tabletId) {
      const filteredTablet = tablets.find((obj) => obj.id === tabletId);
      return (
        <>
          {filteredTablet ? (
            <Box sx={{ color: '#000', justifyContent: 'flex-start' }}>
              <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                <PermIdentityIcon sx={{ fontSize: '16px' }} />
                <Typography variant="body2" component={Link} href={`/tablets`}>
                  <a target="_blank">{filteredTablet?.name}</a>
                </Typography>
              </UIFlexWrapBox>
              <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                <LocationIcon sx={{ fontSize: '16px' }} />
                <UIInfoValue variant="caption">
                  {filteredTablet?.location?.name}
                </UIInfoValue>
              </UIFlexWrapBox>
              <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                <LoyaltyIcon sx={{ fontSize: '16px' }} />
                <UIInfoValue variant="caption">
                  {filteredTablet?.status}
                </UIInfoValue>
              </UIFlexWrapBox>
              <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                <AccessTimeIcon sx={{ fontSize: '16px' }} />
                <UIInfoValue variant="caption">
                  {format(
                    new Date(filteredTablet?.createdAt || ''),
                    'dd MMM KK:mm aa'
                  )}
                </UIInfoValue>
              </UIFlexWrapBox>
            </Box>
          ) : (
            <></>
          )}
        </>
      );
    } else {
      return <></>;
    }
  };

  const renderDescription = (activity: ActivityItemType) => {
    if (activity) {
      return (
        <Box sx={{ color: '#000', justifyContent: 'flex-start' }}>
          <UIFlexWrapBox sx={{ alignItems: 'center' }}>
            <ModelIcon sx={{ fontSize: '16px' }} />
            <UIInfoValue sx={{ width: 'auto' }}>{activity.model}</UIInfoValue>
          </UIFlexWrapBox>
          <UIFlexWrapBox sx={{ alignItems: 'center' }}>
            <TypeIcon sx={{ fontSize: '16px' }} />
            <UIInfoValue sx={{ width: 'auto' }}>{activity.type}</UIInfoValue>
          </UIFlexWrapBox>
          <UIFlexWrapBox sx={{ alignItems: 'center' }}>
            {activity.attributes.status === 'succeed' ? (
              <SucceedIcon sx={{ fontSize: '16px', color: '#069286' }} />
            ) : (
              <FailedIcon sx={{ fontSize: '16px', color: '#eb5757' }} />
            )}
            <UIInfoValue sx={{ textTransform: 'capitalize', width: 'auto' }}>
              {activity.attributes.status}
            </UIInfoValue>
          </UIFlexWrapBox>
          {!activity.attributes.description.includes('jwt expired') && (
            <UIFlexWrapBox sx={{ alignItems: 'flex-start' }}>
              <DescriptionIcon sx={{ fontSize: '16px' }} />
              <UIInfoValue sx={{ width: 'auto' }}>
                {activity.attributes.description}
              </UIInfoValue>
            </UIFlexWrapBox>
          )}
        </Box>
      );
    } else {
      return <></>;
    }
  };

  return (
    <Table>
      <TableHead>
        <StyledTableRow>
          <StyledTableCell>
            <TableSortLabel
              active={orderBy === 'createdAt'}
              direction={order}
              onClick={createSortHandler('createdAt')}
            >
              Date
            </TableSortLabel>
          </StyledTableCell>
          <StyledTableCell>User</StyledTableCell>
          <StyledTableCell>Description</StyledTableCell>
          <StyledTableCell></StyledTableCell>
        </StyledTableRow>
      </TableHead>
      <TableBody>
        {activityTableData?.length > 0 ? (
          activityTableData.map((activityItem, index) => {
            return (
              <StyledTableRow
                key={index}
                data-key={activityItem.id}
                sx={{ position: 'relative' }}
              >
                <StyledTableCell>
                  {format(new Date(activityItem.createdAt), 'yyyy-MM-dd yy:mm')}
                </StyledTableCell>
                <StyledTableCell>
                  {activityItem.model === ActivityModel.TABLET
                    ? renderTablet(activityItem.victimId)
                    : renderUser(activityItem?.user)}
                </StyledTableCell>
                <StyledTableCell>
                  {renderDescription(activityItem)}
                </StyledTableCell>
                <StyledTableCell>
                  <IconButton
                    data-key={activityItem.id}
                    onClick={(event: React.MouseEvent<HTMLElement>) => {
                      setAnchorElOptionsMenu(event.currentTarget);
                    }}
                  >
                    <MoreHorizIcon sx={{ color: '#83A9A8' }} />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            );
          })
        ) : (
          <StyledTableRow
            sx={{
              position: 'relative',
              backgroundColor: 'transparent !important',
            }}
          >
            <StyledTableCell colSpan={4} sx={{ textAlign: 'center' }}>
              No Data
            </StyledTableCell>
          </StyledTableRow>
        )}
      </TableBody>

      <UIOptionMenu
        PaperProps={{
          elevation: 0,
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        anchorEl={anchorElOptionsMenu}
        open={isOptionsMenuOpen}
        onClose={() => {
          setAnchorElOptionsMenu(null);
        }}
        onClick={() => {
          setAnchorElOptionsMenu(null);
        }}
      >
        {menuActivityActions.map((item, index) => {
          return (
            <div key={index}>
              <UIOptionMenuItem
                disableRipple
                disableTouchRipple
                onClick={() => handleClickMenuAction(item.action)}
              >
                <UIOptionMenuItemText
                  key={index}
                  sx={{
                    color: item.color,
                    textDecorationLine: index === 0 ? 'underline' : 'none',
                  }}
                >
                  {item.label}
                </UIOptionMenuItemText>
              </UIOptionMenuItem>
            </div>
          );
        })}
      </UIOptionMenu>
      <ConfirmModal
        open={!!selectedActivity}
        onClose={() => {
          setSelectedActivity(undefined);
        }}
        title="Delete"
        content="Are you sure you want to remove this activity?"
        onAction={() => {
          if (selectedActivity) {
            onDelete(selectedActivity);
          }
          setSelectedActivity(undefined);
        }}
      />
    </Table>
  );
};

export default ActivityTable;
