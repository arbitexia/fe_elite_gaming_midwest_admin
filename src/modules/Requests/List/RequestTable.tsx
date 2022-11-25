import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  TableHead,
  TableBody,
  TableRow,
  Typography,
  Button,
} from '@mui/material';
import { UIChip, UIFlexColumnBox, UIFlexWrapBox } from '@/components/UI';
import {
  StyledRequestCardBox,
  StyledRequestTable,
  StyledRequestTableRow,
  StyledRequestTableCell,
} from './ui';
import { getColor } from '@/libs/data-helper';
import { requestsData } from '@/_mock/requests';
import RequestsPagination from './Pagination';
import { useAppToast } from '@/providers';
import { RewardItemType } from '@/types';

const RequestTable = () => {
  const router = useRouter();
  const showToast = useAppToast();
  const [isActions, setActions] = useState<'accept' | 'decline'>();

  const renderItem = (items: any) => {
    return Object.keys(items).map((key, index) => {
      if (
        key === 'id' ||
        key === 'location' ||
        key === 'specifications' ||
        key === 'url' ||
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
    <StyledRequestCardBox sx={{ marginTop: '30px' }}>
      <Typography
        sx={{
          fontWeight: '600',
          fontSize: '18px',
          lineHeight: '17px',
          color: '#222B35',
        }}
      >
        Requests
      </Typography>
      <StyledRequestTable size="small">
        <TableHead>
          <TableRow>
            <StyledRequestTableCell>ID</StyledRequestTableCell>
            <StyledRequestTableCell>Info</StyledRequestTableCell>
            <StyledRequestTableCell>Requested at</StyledRequestTableCell>
            <StyledRequestTableCell>User</StyledRequestTableCell>
            <StyledRequestTableCell>Location</StyledRequestTableCell>
            <StyledRequestTableCell>Statue</StyledRequestTableCell>
            <StyledRequestTableCell></StyledRequestTableCell>
          </TableRow>
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
                  <StyledRequestTableCell>
                    {request.requestedAt}
                  </StyledRequestTableCell>
                  <StyledRequestTableCell>
                    <Button
                      onClick={() => {
                        router.push(`/users/${request.user.id}`);
                      }}
                    >
                      {request.user.name}
                    </Button>
                  </StyledRequestTableCell>
                  <StyledRequestTableCell>
                    <Button
                      sx={{ color: '#B3B3B3 !important' }}
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
                        color="success"
                        size="small"
                        onClick={() => {
                          setActions('accept');
                        }}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
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
      </StyledRequestTable>
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
    </StyledRequestCardBox>
  );
};

export default RequestTable;
