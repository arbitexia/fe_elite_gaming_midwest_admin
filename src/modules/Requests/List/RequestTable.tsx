import React, { useState } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  Typography,
  Button,
  Box,
  TableSortLabel,
} from '@mui/material';
import { UIChip, UIFlexColumnBox, UIFlexWrapBox } from '@/components/UI';
import {
  Loyalty as LoyaltyIcon,
  Grain as GrainIcon,
  Place as PlaceIcon,
  AccessTime as AccessTimeIcon,
  EmailOutlined as EmailOutlinedIcon,
  PermIdentity as PermIdentityIcon,
  PhoneOutlined as PhoneOutlinedIcon,
  InventoryOutlined as InventoryOutlinedIcon,
  SmartToy as SmartToyIcon,
  DriveFileRenameOutline as DriveFileRenameOutlineIcon,
} from '@mui/icons-material';
import {
  formatCurrency,
  formatPhoneNumber,
  getColor,
} from '@/libs/data-helper';
import { TransactionType, UserType, Product, Location } from '@/types';
import { StyledRequestTableRow, StyledRequestTableCell } from './ui';
import { format } from 'date-fns';
import Link from 'next/link';
import { useAuth } from '@/hooks';
import { CouponEnum, TransactionStatus } from '@/constants';

interface RequestTableProps {
  requestsData: TransactionType.Data[];
  onAction: (value: TransactionType.Param) => void;
}
type Order = 'asc' | 'desc';

const renderProduct = (product: Product.Data) => (
  <Box
    key={`request-product-${product.id}`}
    sx={{ color: '#000', justifyContent: 'flex-start' }}
  >
    <UIFlexWrapBox sx={{ alignItems: 'center' }}>
      <InventoryOutlinedIcon sx={{ fontSize: '14px' }} />
      <Typography
        variant="body2"
        component={Link}
        href={`/products/${product.id}`}
      >
        <a target="_blank">{product.name}</a>
      </Typography>
    </UIFlexWrapBox>
    <UIFlexWrapBox sx={{ alignItems: 'center' }}>
      <LoyaltyIcon sx={{ fontSize: '14px' }} />
      <Typography variant="caption">{product.status}</Typography>
    </UIFlexWrapBox>
    <UIFlexWrapBox sx={{ alignItems: 'center' }}>
      <AccessTimeIcon sx={{ fontSize: '14px' }} />
      <Typography variant="caption">
        {format(new Date(product?.createdAt || ''), 'dd MMM KK:mm aa')}
      </Typography>
    </UIFlexWrapBox>
  </Box>
);

const renderUser = (user: UserType.User) => (
  <Box
    key={`request-users-${user.id}`}
    sx={{ color: '#000', justifyContent: 'flex-start' }}
  >
    <UIFlexWrapBox sx={{ alignItems: 'center' }}>
      <PermIdentityIcon sx={{ fontSize: '14px' }} />
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
      <EmailOutlinedIcon sx={{ fontSize: '14px' }} />
      <Typography variant="caption">{user.email}</Typography>
    </UIFlexWrapBox>
    <UIFlexWrapBox sx={{ alignItems: 'center' }}>
      <PhoneOutlinedIcon sx={{ fontSize: '14px' }} />
      <Typography variant="caption">{formatPhoneNumber(user.phone)}</Typography>
    </UIFlexWrapBox>
    <UIFlexWrapBox sx={{ alignItems: 'center' }}>
      <LoyaltyIcon sx={{ fontSize: '14px' }} />
      <Typography variant="caption">{user.status}</Typography>
    </UIFlexWrapBox>
    <UIFlexWrapBox sx={{ alignItems: 'center' }}>
      <AccessTimeIcon sx={{ fontSize: '14px' }} />
      <Typography variant="caption">
        {format(new Date(user?.createdAt || ''), 'dd MMM KK:mm aa')}
      </Typography>
    </UIFlexWrapBox>
  </Box>
);

const renderLocation = (location: Location.Data) => (
  <Box
    key={`request-location-${location.id}`}
    sx={{ color: '#000', justifyContent: 'flex-start' }}
  >
    <UIFlexWrapBox sx={{ alignItems: 'center' }}>
      <DriveFileRenameOutlineIcon sx={{ fontSize: '14px' }} />
      <Typography
        variant="body2"
        component={Link}
        href={`/products/${location.id}`}
      >
        <a target="_blank">{location.name}</a>
      </Typography>
    </UIFlexWrapBox>
    <UIFlexWrapBox sx={{ alignItems: 'center' }}>
      <PlaceIcon sx={{ fontSize: '14px' }} />
      <Typography variant="caption">
        {location.address?.address1} {location.address?.city}{' '}
        {location.address?.state} {location.address?.zipcode}
      </Typography>
    </UIFlexWrapBox>
    <UIFlexWrapBox sx={{ alignItems: 'center' }}>
      <SmartToyIcon sx={{ fontSize: '14px' }} />
      <Typography variant="caption">{location.type}</Typography>
    </UIFlexWrapBox>

    <UIFlexWrapBox sx={{ alignItems: 'center' }}>
      <LoyaltyIcon sx={{ fontSize: '14px' }} />
      <Typography variant="caption">{location.status}</Typography>
    </UIFlexWrapBox>
  </Box>
);

const RequestTable = ({ requestsData, onAction }: RequestTableProps) => {
  const { me } = useAuth();
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof TransactionType.Data>('id');

  const createSortHandler =
    (property: keyof TransactionType.Data) =>
    (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof TransactionType.Data
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  if (requestsData && requestsData.length <= 0) {
    return (
      <UIFlexColumnBox sx={{ height: '200px' }}>
        <Typography
          sx={{
            color: '#B3B3B3',
            fontSize: 14,
            fontWeight: 500,
            marginLeft: '4px',
            my: '4px',
          }}
        >
          No recent requests
        </Typography>
      </UIFlexColumnBox>
    );
  }

  return (
    <Table>
      <TableHead>
        <StyledRequestTableRow>
          <StyledRequestTableCell>
            <TableSortLabel
              active={orderBy === 'id'}
              direction={order}
              onClick={createSortHandler('id')}
            >
              ID
            </TableSortLabel>
          </StyledRequestTableCell>
          <StyledRequestTableCell>User Info</StyledRequestTableCell>
          <StyledRequestTableCell>
            <TableSortLabel active={orderBy === 'user'} direction={order}>
              Product Info
            </TableSortLabel>
          </StyledRequestTableCell>
          <StyledRequestTableCell>
            <TableSortLabel
              active={orderBy === 'location'}
              direction={order}
              onClick={createSortHandler('location')}
            >
              Game Place
            </TableSortLabel>
          </StyledRequestTableCell>
          <StyledRequestTableCell>Type</StyledRequestTableCell>
          <StyledRequestTableCell>
            <TableSortLabel
              active={orderBy === 'amount'}
              direction={order}
              onClick={createSortHandler('amount')}
            >
              Amount
            </TableSortLabel>
          </StyledRequestTableCell>

          <StyledRequestTableCell>
            <TableSortLabel
              active={orderBy === 'status'}
              direction={order}
              onClick={createSortHandler('status')}
            >
              Status
            </TableSortLabel>
          </StyledRequestTableCell>
          <StyledRequestTableCell>
            <TableSortLabel
              active={orderBy === 'createdAt'}
              direction={order}
              onClick={createSortHandler('createdAt')}
            >
              Requested at
            </TableSortLabel>
          </StyledRequestTableCell>
          <StyledRequestTableCell></StyledRequestTableCell>
        </StyledRequestTableRow>
      </TableHead>
      <TableBody>
        {requestsData &&
          requestsData.length > 0 &&
          requestsData?.map((request, index) => {
            return (
              <StyledRequestTableRow key={`request-${index}`}>
                <StyledRequestTableCell>#{request.id}</StyledRequestTableCell>
                <StyledRequestTableCell>
                  {renderUser(request.user)}
                </StyledRequestTableCell>
                <StyledRequestTableCell>
                  {request.reward?.product &&
                    renderProduct(request.reward.product)}
                </StyledRequestTableCell>
                <StyledRequestTableCell>
                  {request?.location && renderLocation(request.location)}
                </StyledRequestTableCell>
                <StyledRequestTableCell>
                  {request.reward?.product && request?.location
                    ? 'Reward'
                    : 'Coupon'}
                </StyledRequestTableCell>
                <StyledRequestTableCell>
                  {request.type === CouponEnum.COUPON
                    ? formatCurrency(request.amount)
                    : request.amount}
                </StyledRequestTableCell>
                <StyledRequestTableCell>
                  <UIChip
                    label={request.status}
                    color={getColor(request.status)}
                  />
                </StyledRequestTableCell>
                <StyledRequestTableCell sx={{ color: '#ABACAC !important' }}>
                  {format(new Date(request.createdAt), 'yyyy-MM-dd hh:mm')}
                </StyledRequestTableCell>
                <StyledRequestTableCell>
                  <UIFlexWrapBox>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ color: '#FFFFFF', background: '#11918D' }}
                      onClick={() => {
                        onAction({
                          transactionId: request.id,
                          status: TransactionStatus.ACCEPTED,
                          assignee: me as UserType.User,
                        });
                      }}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        border: '1px solid rgba(137, 200, 198, 0.5)',
                        color: '#11918D',
                      }}
                      onClick={() => {
                        onAction({
                          transactionId: request.id,
                          status: TransactionStatus.DECLINED,
                          assignee: me as UserType.User,
                        });
                      }}
                    >
                      Decline
                    </Button>
                  </UIFlexWrapBox>
                </StyledRequestTableCell>
              </StyledRequestTableRow>
            );
          })}
      </TableBody>
    </Table>
  );
};

export default RequestTable;
