import { useState } from 'react';
import { Table, TableHead, TableBody, TableSortLabel } from '@mui/material';
import { StyledTableRow, StyledTableCell } from './ui';
import { ActivityItemType } from '@/types';
import { format } from 'date-fns';

type ActivityTableProps = {
  activityTableData: ActivityItemType[];
};

const ActivityTable = ({ activityTableData }: ActivityTableProps) => {
  type Order = 'asc' | 'desc';
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof ActivityItemType>('id');

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

  function getComparator<Key extends keyof ActivityItemType>(
    order: Order,
    orderBy: Key
  ): (a: ActivityItemType, b: ActivityItemType) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(
    a: ActivityItemType,
    b: ActivityItemType,
    orderBy: keyof ActivityItemType
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
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const createSortHandler =
    (property: keyof ActivityItemType) =>
    (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof ActivityItemType
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  return (
    <Table>
      <TableHead>
        <StyledTableRow>
          <StyledTableCell sx={{ pl: '30px' }}>
            <TableSortLabel
              active={orderBy === 'id'}
              direction={order}
              onClick={createSortHandler('id')}
            >
              Id
            </TableSortLabel>
          </StyledTableCell>
          <StyledTableCell>
            <TableSortLabel
              active={orderBy === 'user'}
              direction={order}
              onClick={createSortHandler('user')}
            >
              User
            </TableSortLabel>
          </StyledTableCell>
          <StyledTableCell>Date</StyledTableCell>
          <StyledTableCell>
            <TableSortLabel
              active={orderBy === 'model'}
              direction={order}
              onClick={createSortHandler('model')}
            >
              Model
            </TableSortLabel>
          </StyledTableCell>
          <StyledTableCell>
            <TableSortLabel
              active={orderBy === 'action'}
              direction={order}
              onClick={createSortHandler('action')}
            >
              Type
            </TableSortLabel>
          </StyledTableCell>
          <StyledTableCell>
            <TableSortLabel
              active={orderBy === 'status'}
              direction={order}
              onClick={createSortHandler('status')}
            >
              Status
            </TableSortLabel>
          </StyledTableCell>
        </StyledTableRow>
      </TableHead>
      <TableBody>
        {stableSort<ActivityItemType>(
          activityTableData,
          getComparator(order, orderBy)
        ).map((activityItem) => {
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
                {format(new Date(activityItem.createdAt), 'MM/dd/yyyy')}
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
