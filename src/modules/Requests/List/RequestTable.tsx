import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
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
import RequestsPagination from './Pagination';
import { useAppToast } from '@/providers';
import { RequestItemType } from '@/types';

interface RequestTableProps {
  requestsData: RequestItemType[];
}

const RequestTable = ({ requestsData }: RequestTableProps) => {
  const router = useRouter();
  const showToast = useAppToast();
  const [isActions, setActions] = useState<'accept' | 'decline'>();
  type Order = 'asc' | 'desc';
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof RequestItemType>('id');

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

  function getComparator<Key extends keyof RequestItemType>(
    order: Order,
    orderBy: Key
  ): (a: RequestItemType, b: RequestItemType) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(
    a: RequestItemType,
    b: RequestItemType,
    orderBy: keyof RequestItemType
  ) {
    if (orderBy === 'user') {
      if (
        `${b.user.firstName} ${b.user.lastName}` <
        `${a.user.firstName} ${a.user.lastName}`
      ) {
        return -1;
      }
      if (
        `${b.user.firstName} ${b.user.lastName}` >
        `${a.user.firstName} ${a.user.lastName}`
      ) {
        return 1;
      }
    }
    if (orderBy === 'location') {
      if (b.location.name < a.location.name) {
        return -1;
      }
      if (b.location.name > a.location.name) {
        return 1;
      }
    }
    if (orderBy === 'item') {
      if (b.item.name < a.item.name) {
        return -1;
      }
      if (b.item.name > a.item.name) {
        return 1;
      }
    }
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const createSortHandler =
    (property: keyof RequestItemType) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof RequestItemType
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const renderItem = (items: any) => {
    return Object.keys(items).map((key, index) => {
      if (
        key === 'id' ||
        key === 'location' ||
        key === 'locationId' ||
        key === 'short' ||
        key === 'urls' ||
        key === 'description' ||
        key === 'createdAt'
      )
        return;
      return (
        <UIFlexWrapBox key={`item-${index}`} sx={{ alignItems: 'center' }}>
          <Typography
            sx={{
              color: '#0000004d',
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

  useEffect(() => {
    if (isActions === 'accept') {
      showToast({
        severity: 'success',
        message: 'Accepted',
      });
    } else if (isActions === 'decline') {
      showToast({
        severity: 'info',
        message: 'Declined',
      });
    }
  }, [isActions]);

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
                active={orderBy === 'item'}
                direction={order}
                onClick={createSortHandler('item')}
              >
                Info
              </TableSortLabel>
            </StyledRequestTableCell>
            <StyledRequestTableCell>
              <TableSortLabel
                active={orderBy === 'requestedAt'}
                direction={order}
                onClick={createSortHandler('requestedAt')}
              >
                Requested at
              </TableSortLabel>
            </StyledRequestTableCell>
            <StyledRequestTableCell>
              <TableSortLabel
                active={orderBy === 'user'}
                direction={order}
                onClick={createSortHandler('user')}
              >
                User
              </TableSortLabel>
            </StyledRequestTableCell>
            <StyledRequestTableCell>
              <TableSortLabel
                active={orderBy === 'location'}
                direction={order}
                onClick={createSortHandler('location')}
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
            stableSort<RequestItemType>(
              requestsData,
              getComparator(order, orderBy)
            ).map((request, index) => {
              return (
                <StyledRequestTableRow key={`request-${index}`}>
                  <StyledRequestTableCell>#{request.id}</StyledRequestTableCell>
                  <StyledRequestTableCell>
                    {renderItem(request.item)}
                  </StyledRequestTableCell>
                  <StyledRequestTableCell sx={{ color: '#ABACAC !important' }}>
                    {request.requestedAt}
                  </StyledRequestTableCell>
                  <StyledRequestTableCell>
                    <Button
                      sx={{ color: '#000000B2 !important' }}
                      onClick={() => {
                        router.push(`/users/customers/${request.user.id}`);
                      }}
                    >
                      {`${request.user.firstName} ${request.user.lastName}`}
                    </Button>
                  </StyledRequestTableCell>
                  <StyledRequestTableCell>
                    <Button
                      sx={{ color: '#ABACAC !important' }}
                      onClick={() => {
                        router.push(`locations/${request.location.id}`);
                      }}
                    >
                      {request.location.name}
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
                          setActions('accept');
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
                          setActions('decline');
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
      <RequestsPagination />
    </>
  );
};

export default RequestTable;
