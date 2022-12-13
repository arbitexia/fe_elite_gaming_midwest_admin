import { Table, TableHead, TableBody } from '@mui/material';
import { StyledTableRow, StyledTableCell } from './ui';
import { ActivityItemType } from '@/types';
import { format } from 'date-fns';

type ActivityTableProps = {
  activityTableData: ActivityItemType[];
};

const ActivityTable = ({ activityTableData }: ActivityTableProps) => {
  return (
    <Table>
      <TableHead>
        <StyledTableRow>
          <StyledTableCell sx={{ pl: '30px' }}>Id</StyledTableCell>
          <StyledTableCell>User</StyledTableCell>
          <StyledTableCell>Date</StyledTableCell>
          <StyledTableCell>Model</StyledTableCell>
          <StyledTableCell>Type</StyledTableCell>
          <StyledTableCell>Status</StyledTableCell>
        </StyledTableRow>
      </TableHead>
      <TableBody>
        {activityTableData.map((activityItem) => {
          // const labelId = `enhanced-table-checkbox-${index}`;
          return (
            <StyledTableRow
              key={activityItem.id}
              data-key={activityItem.id}
              sx={{ position: 'relative' }}
            >
              <StyledTableCell sx={{ pl: '30px' }}>
                #{activityItem.id}
              </StyledTableCell>
              <StyledTableCell>
                {`${activityItem.user.firstName} ${activityItem.user.lastName}`}
              </StyledTableCell>

              <StyledTableCell>
                {format(new Date(activityItem.createdAt), 'yyyy-MM-dd')}
              </StyledTableCell>
              <StyledTableCell>{activityItem.model}</StyledTableCell>
              <StyledTableCell>{activityItem.action}</StyledTableCell>
              <StyledTableCell>{activityItem.status}</StyledTableCell>
            </StyledTableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ActivityTable;
