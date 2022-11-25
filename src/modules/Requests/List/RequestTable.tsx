import {
  TableHead,
  TableBody,
  TableRow,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { UIActionButton, UIChip, UIFlexWrapBox } from '@/components/UI';
import {
  StyledRequestCardBox,
  StyledRequestTable,
  StyledRequestTableRow,
  StyledRequestTableCell,
} from './ui';
import { getColor } from '@/libs/data-helper';
import { requestsData } from '@/_mock/requests';
import RequestsPagination from './Pagination';

const RequestTable = () => {
  const renderItemInfo = (items: any) => {
    return Object.keys(items).map((key, index) => {
      return (
        <UIFlexWrapBox key={`item-${index}`}>
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

          <Typography
            sx={{
              color: '#06251F',
              fontSize: 14,
              fontWeight: 500,
            }}
            key={index}
          >
            {items[key]}
          </Typography>
        </UIFlexWrapBox>
      );
    });
  };
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
          {requestsData.map((request, index) => {
            return (
              <StyledRequestTableRow key={`request-${index}`}>
                <StyledRequestTableCell>{request.id}</StyledRequestTableCell>
                <StyledRequestTableCell>
                  {renderItemInfo(request.item)}
                </StyledRequestTableCell>
                <StyledRequestTableCell>
                  {request.requestedAt}
                </StyledRequestTableCell>
                <StyledRequestTableCell>
                  {request.user.name}
                </StyledRequestTableCell>
                <StyledRequestTableCell sx={{ color: '#B3B3B3 !important' }}>
                  {request.location}
                </StyledRequestTableCell>
                <StyledRequestTableCell>
                  <UIChip
                    label={request.status}
                    color={getColor(request.status)}
                  />
                </StyledRequestTableCell>
                <StyledRequestTableCell>
                  <UIFlexWrapBox>
                    <Button variant="contained" color="success" size="small">
                      Accept
                    </Button>
                    <Button variant="outlined" color="error" size="small">
                      Decline
                    </Button>
                  </UIFlexWrapBox>
                </StyledRequestTableCell>
              </StyledRequestTableRow>
            );
          })}
        </TableBody>
      </StyledRequestTable>
      <RequestsPagination />
    </StyledRequestCardBox>
  );
};

export default RequestTable;
