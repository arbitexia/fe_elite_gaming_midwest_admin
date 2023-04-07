import React, { useState } from 'react';
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
import { getColor } from '@/libs/data-helper';
import { TransactionType, UserType } from '@/types';
import { StyledRequestTableRow, StyledRequestTableCell } from './ui';
import { format } from 'date-fns';
import { useAuth } from '@/hooks';
import { TransactionStatus } from '@/constants';

interface RequestTableProps {
  requestsData: TransactionType.Data[];
  onAction: (value: TransactionType.Param) => void;
}
type Order = 'asc' | 'desc';

const RequestTable = ({ requestsData, onAction }: RequestTableProps) => {
  const router = useRouter();
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

  const renderItem = (items: any) => {
    return Object.keys(items).map((key, index) => {
      if (
        key === 'id' ||
        key === 'short' ||
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
              width: 58,
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
              {key === 'updatedAt'
                ? format(new Date(items[key]), 'yyyy-MM-dd')
                : items[key]}
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
            <StyledRequestTableCell>Info</StyledRequestTableCell>
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
            requestsData?.map((request, index) => {
              return (
                <StyledRequestTableRow key={`request-${index}`}>
                  <StyledRequestTableCell>#{request.id}</StyledRequestTableCell>
                  <StyledRequestTableCell>
                    {renderItem(request.reward.product)}
                  </StyledRequestTableCell>
                  <StyledRequestTableCell sx={{ color: '#ABACAC !important' }}>
                    {format(new Date(request.createdAt), 'yyyy-MM-dd')}
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
    </>
  );
};

export default RequestTable;
