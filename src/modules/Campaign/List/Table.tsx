import { useState } from 'react';
import { format } from 'date-fns';
import {
  Table,
  TableHead,
  TableBody,
  IconButton,
  Divider,
  TableSortLabel,
  Switch,
  Box,
  Typography,
  LinearProgress,
} from '@mui/material';
import { LinearProgressProps } from '@mui/material/LinearProgress';
import {
  MoreHoriz as MoreHorizIcon,
  PhoneIphone as PhoneIcon,
  Textsms as SmsICon,
} from '@mui/icons-material';
import {
  UIOptionMenuItemText,
  UIOptionMenu,
  UIOptionMenuItem,
  UIListTableCell,
  UIListTableRow,
} from '@/components/UI';
import {
  CouponEnum,
  MenuAction,
  campaignNameIcons,
  menuCampaignActions,
} from '@/constants';
import { CampaignType } from '@/types';
import { formatCurrency } from '@/libs/data-helper';
import { CampaignChannelsEnum } from '@/constants/enum';

type CampaignTableProps = {
  campaignTableData: CampaignType.Data[];
  onAction: (
    value: CampaignType.Data,
    type: 'edit' | 'delete' | 'enabled'
  ) => void;
};

type Order = 'asc' | 'desc';

const CampaignTable = ({ campaignTableData, onAction }: CampaignTableProps) => {
  const [anchorElOptionsMenu, setAnchorElOptionsMenu] =
    useState<null | HTMLElement>(null);
  const isOptionsMenuOpen = Boolean(anchorElOptionsMenu);

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof CampaignType.Data>('id');

  const handleClickMenuAction = (key: string) => {
    const selectedId = parseInt(
      anchorElOptionsMenu?.getAttribute('data-key') ?? '0'
    );
    const selectedItem = campaignTableData.find((t) => t.id === selectedId);
    if (key === MenuAction.EDIT) {
      selectedItem && onAction(selectedItem, 'edit');
    } else if (key === MenuAction.DELETE) {
      selectedItem && onAction(selectedItem, 'delete');
    }
  };

  const createSortHandler =
    (property: keyof CampaignType.Data) =>
    (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof CampaignType.Data
  ) => {
    const newOrder = orderBy === property && order === 'asc' ? 'desc' : 'asc';
    setOrder(newOrder);
    setOrderBy(property);
  };

  const handleChangeEnable = (value: CampaignType.Data) => {
    const dataToUpdate = { ...value, status: value.status === 1 ? 0 : 1 };
    onAction(dataToUpdate, 'enabled');
  };

  const LinearProgressWithLabel = (
    props: LinearProgressProps & { value: number }
  ) => {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Table>
      <TableHead>
        <UIListTableRow>
          <UIListTableCell>
            <TableSortLabel
              active={orderBy === 'id'}
              direction={order}
              onClick={createSortHandler('id')}
            >
              Id
            </TableSortLabel>
          </UIListTableCell>
          <UIListTableCell>Name</UIListTableCell>
          <UIListTableCell>Type</UIListTableCell>
          <UIListTableCell>Offer</UIListTableCell>
          <UIListTableCell>Total</UIListTableCell>
          <UIListTableCell>Redeemed</UIListTableCell>
          <UIListTableCell>%Redeemed</UIListTableCell>
          <UIListTableCell>Enabled</UIListTableCell>
          <UIListTableCell>Channels</UIListTableCell>
          <UIListTableCell>Start Date</UIListTableCell>
          <UIListTableCell>End Date</UIListTableCell>
          <UIListTableCell />
        </UIListTableRow>
      </TableHead>
      <TableBody>
        {campaignTableData?.length > 0 ? (
          campaignTableData?.map((item) => {
            return (
              <UIListTableRow key={item.id} data-key={item.id} role="checkbox">
                <UIListTableCell>#{item.id}</UIListTableCell>
                <UIListTableCell>
                  <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
                    {
                      campaignNameIcons.find((obj) => obj.name === item.type)
                        ?.icon
                    }
                    {item.name}
                  </Box>
                </UIListTableCell>
                <UIListTableCell>{item.type}</UIListTableCell>
                <UIListTableCell>
                  {item?.offer > 0 && item.offerType === CouponEnum.COUPON
                    ? `${formatCurrency(item.offer)} Free Game play`
                    : `${item.offer} points`}
                </UIListTableCell>
                <UIListTableCell>
                  {item?.total > 0 ? item.total : '-'}
                </UIListTableCell>
                <UIListTableCell>
                  {item?.redeemed > 0 ? item.redeemed : '-'}
                </UIListTableCell>
                <UIListTableCell>
                  {item.redeemed > 0 ? (
                    <LinearProgressWithLabel
                      value={Number(
                        ((item.redeemed / item.total) * 100).toFixed(0)
                      )}
                    />
                  ) : (
                    '-'
                  )}
                </UIListTableCell>
                <UIListTableCell>
                  <Switch
                    checked={item.status === 0 ? false : true}
                    onChange={() => {
                      handleChangeEnable(item);
                    }}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </UIListTableCell>
                <UIListTableCell>
                  <SmsICon
                    sx={{
                      width: '22px',
                      mr: 1,
                      color:
                        item.channels === CampaignChannelsEnum.EMAIL ||
                        item.channels === CampaignChannelsEnum.BOTH
                          ? '#18a98d'
                          : '#494b4b',
                    }}
                  />
                  <PhoneIcon
                    sx={{
                      width: '22px',
                      color:
                        item.channels === CampaignChannelsEnum.PHONE ||
                        item.channels === CampaignChannelsEnum.BOTH
                          ? '#18a98d'
                          : '#494b4b',
                    }}
                  />
                </UIListTableCell>
                <UIListTableCell>
                  {format(new Date(item.startDate as string), 'yyyy-MM-dd')}
                </UIListTableCell>
                <UIListTableCell>
                  {format(new Date(item.endDate as string), 'yyyy-MM-dd')}
                </UIListTableCell>
                <UIListTableCell>
                  <IconButton
                    data-key={item.id}
                    onClick={(event: React.MouseEvent<HTMLElement>) => {
                      setAnchorElOptionsMenu(event.currentTarget);
                    }}
                  >
                    <MoreHorizIcon sx={{ color: '#83A9A8' }} />
                  </IconButton>
                </UIListTableCell>
              </UIListTableRow>
            );
          })
        ) : (
          <UIListTableRow
            sx={{
              position: 'relative',
              backgroundColor: 'transparent !important',
            }}
          >
            <UIListTableCell colSpan={10} sx={{ textAlign: 'center' }}>
              No Data
            </UIListTableCell>
          </UIListTableRow>
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
        {menuCampaignActions.map((item, index) => {
          return (
            <div key={index}>
              {index === 1 && <Divider />}
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
    </Table>
  );
};

export default CampaignTable;
