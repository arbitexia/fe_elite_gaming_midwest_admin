import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Table, TableHead, TableBody, Typography, Button } from '@mui/material';
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

  const renderItem = (items: any) => {
    return Object.keys(items).map((key, index) => {
      if (
        key === 'id' ||
        key === 'location' ||
        key === 'specifications' ||
        key === 'urls' ||
        key === 'description' ||
        key === 'createdAt'
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
      <Table size="small">
        <TableHead>
          <StyledRequestTableRow>
            <StyledRequestTableCell>ID</StyledRequestTableCell>
            <StyledRequestTableCell>Info</StyledRequestTableCell>
            <StyledRequestTableCell>Requested at</StyledRequestTableCell>
            <StyledRequestTableCell>User</StyledRequestTableCell>
            <StyledRequestTableCell>Location</StyledRequestTableCell>
            <StyledRequestTableCell>Statue</StyledRequestTableCell>
            <StyledRequestTableCell></StyledRequestTableCell>
          </StyledRequestTableRow>
        </TableHead>
        <TableBody>
          {requestsData &&
            requestsData.length > 0 &&
            requestsData.map((request, index) => {
              return (
                <StyledRequestTableRow key={`request-${index}`}>
                  <StyledRequestTableCell>{request.id}</StyledRequestTableCell>
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
