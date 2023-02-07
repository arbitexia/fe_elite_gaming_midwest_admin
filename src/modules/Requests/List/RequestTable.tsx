import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableHead,
  TableBody,
  Typography,
  Button,
  TableSortLabel,
} from '@mui/material';
import { UIChip, UIFlexColumnBox, UIFlexWrapBox } from '@/components/UI';
import { StyledRequestTableRow, StyledRequestTableCell } from './ui';
import { getColor } from '@/libs/data-helper';
import { AwardType } from '@/types';
import { format } from 'date-fns';
import { useAward } from '@/hooks';

interface RequestTableProps {
  requestsData: AwardType[];
}

const RequestTable = ({ requestsData }: RequestTableProps) => {
  const router = useRouter();
  const { onAcceptAward, onDeclineAward } = useAward();
  type Order = 'asc' | 'desc';
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string>('id');
  const [confirmAction, setConfirmAction] = useState({
    action: '',
    id: 0,
    open: false,
  });

  const handleOk = () => {
    if (confirmAction.id === 0) return;
    if (confirmAction.action === 'accept') onAcceptAward(confirmAction.id);
    else onDeclineAward(confirmAction.id);
    setConfirmAction({ ...confirmAction, open: false });
  };

  function stableSort<T>(
    array: readonly T[],
    comparator: (a: T, b: T) => number
  ) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(
    order: Order,
    orderBy: string
  ): (a: AwardType, b: AwardType) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a: any, b: any, orderBy: string) {
    if (
      orderBy === 'userLocation.user' &&
      b.userLocation?.user?.fullName &&
      a.userLocation?.user?.fullName
    ) {
      if (b.userLocation?.user?.fullName < a.userLocation?.user?.fullName) {
        return -1;
      }
      if (b.userLocation?.user?.fullName > a.userLocation?.user?.fullName) {
        return 1;
      }
    } else if (
      orderBy === 'userLocation.location' &&
      b.userLocation?.location &&
      a.userLocation?.location
    ) {
      if (b.userLocation?.location?.name < a.userLocation?.location?.name) {
        return -1;
      }
      if (b.userLocation?.location?.name > a.userLocation?.location?.name) {
        return 1;
      }
    } else if (orderBy === 'product' && b.product && a.product) {
      if (b.product.name < a.product.name) {
        return -1;
      }
      if (b.product?.name > a.product?.name) {
        return 1;
      }
    } else {
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
    }

    return 0;
  }

  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const renderItem = (items: any) => {
    return Object.keys(items).map((key, index) => {
      if (
        key === 'id' ||
        key === 'locationId' ||
        key === 'short' ||
        key === 'gallery' ||
        key === 'description' ||
        key === 'createdAt' ||
        key === 'updatedAt'
      )
        return;
      return (
        <UIFlexWrapBox key={`item-${index}`} sx={{ alignItems: 'center' }}>
          <Typography
            sx={{
              color: 'rgba(0, 0, 0, 0.3)',
              fontSize: 12,
              fontWeight: 500,
              textTransform: 'capitalize',
              width: 40,
            }}
          >
            {key}:
          </Typography>

          {key === 'name' ? (
            <Button
              sx={{ fontSize: 14 }}
              size="small"
              onClick={() => {
                router.push(`/rewards/${items['id']}`);
              }}
            >
              {items[key]}
            </Button>
          ) : (
            <Typography
              sx={{
                color: '#06251F',
                fontSize: 14,
                fontWeight: 500,
                marginLeft: '4px',
                my: '4px',
              }}
            >
              {items[key]}
            </Typography>
          )}
        </UIFlexWrapBox>
      );
    });
  };

  return (
    <>
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
            <StyledRequestTableCell>
              <TableSortLabel
                active={orderBy === 'product'}
                direction={order}
                onClick={createSortHandler('product')}
              >
                Info
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
            <StyledRequestTableCell>
              <TableSortLabel
                active={orderBy === 'userLocation.user'}
                direction={order}
                onClick={createSortHandler('userLocation.user')}
              >
                User
              </TableSortLabel>
            </StyledRequestTableCell>
            <StyledRequestTableCell>
              <TableSortLabel
                active={orderBy === 'userLocation.location'}
                direction={order}
                onClick={createSortHandler('userLocation.location')}
              >
                Location
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
            <StyledRequestTableCell></StyledRequestTableCell>
          </StyledRequestTableRow>
        </TableHead>
        <TableBody>
          {requestsData &&
            requestsData.length > 0 &&
            stableSort<AwardType>(
              requestsData,
              getComparator(order, orderBy)
            ).map((request, index) => {
              return (
                <StyledRequestTableRow key={`request-${index}`}>
                  <StyledRequestTableCell>#{request.id}</StyledRequestTableCell>
                  <StyledRequestTableCell>
                    {renderItem(request.product)}
                  </StyledRequestTableCell>
                  <StyledRequestTableCell sx={{ color: '#ABACAC !important' }}>
                    {format(
                      new Date(request.createdAt ?? ''),
                      'yyyy-MM-dd hh:mm:ss'
                    )}
                  </StyledRequestTableCell>
                  <StyledRequestTableCell>
                    <Button
                      sx={{ color: '#000000B2 !important' }}
                      onClick={() => {
                        router.push(
                          `/users/customers/${request.userLocation?.user?.id}`
                        );
                      }}
                    >
                      {`${request.userLocation?.user?.firstName} ${request.userLocation?.user?.lastName}`}
                    </Button>
                  </StyledRequestTableCell>
                  <StyledRequestTableCell>
                    <Button
                      sx={{ color: '#ABACAC !important' }}
                      onClick={() => {
                        router.push(
                          `locations/${request.userLocation?.location?.id}`
                        );
                      }}
                    >
                      {request.userLocation?.location?.name}
                    </Button>
                  </StyledRequestTableCell>
                  <StyledRequestTableCell>
                    <UIChip
                      label={request.status}
                      color={getColor(request.status)}
                    />
                  </StyledRequestTableCell>
                  <StyledRequestTableCell>
                    <UIFlexWrapBox>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ color: '#FFFFFF', background: '#11918D' }}
                        onClick={() => {
                          setConfirmAction({
                            action: 'accept',
                            id: request.id,
                            open: true,
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
                          setConfirmAction({
                            action: 'decline',
                            id: request.id,
                            open: true,
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
      {requestsData && requestsData.length <= 0 && (
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
      )}
      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        maxWidth="xs"
        open={confirmAction.open}
      >
        <DialogTitle>Confirm Request</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to {confirmAction.action} reward?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => setConfirmAction({ ...confirmAction, open: false })}
          >
            Cancel
          </Button>
          <Button onClick={handleOk}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RequestTable;
