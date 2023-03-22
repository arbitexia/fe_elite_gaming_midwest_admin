import { useState } from 'react';
import { format } from 'date-fns';
import { Table, TableHead, TableBody, TableSortLabel } from '@mui/material';
import { ActivityItemType } from '@/types';
import { StyledTableRow, StyledTableCell } from './ui';

type ActivityTableProps = {
  activityTableData: ActivityItemType[];
  onOrder: (value: string) => void;
};

const ActivityTable = ({ activityTableData, onOrder }: ActivityTableProps) => {
  type Order = 'asc' | 'desc';
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<keyof ActivityItemType>('id');

  const createSortHandler =
    (property: keyof ActivityItemType) =>
    (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof ActivityItemType
  ) => {
    const newOrder = orderBy === property && order === 'asc' ? 'desc' : 'asc';
    setOrder(newOrder);
    setOrderBy(property);
    onOrder(`${property}|${newOrder}`);
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
          <StyledTableCell>
            <TableSortLabel
              active={orderBy === 'createdAt'}
              direction={order}
              onClick={createSortHandler('createdAt')}
            >
              Date
            </TableSortLabel>
          </StyledTableCell>
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
              active={orderBy === 'type'}
              direction={order}
              onClick={createSortHandler('type')}
            >
              Type
            </TableSortLabel>
          </StyledTableCell>
          <StyledTableCell>Status</StyledTableCell>
        </StyledTableRow>
      </TableHead>
      <TableBody>
        {activityTableData?.map((activityItem) => {
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
                {`${activityItem?.user?.firstName ?? ''} ${
                  activityItem?.user?.lastName ?? ''
                }`}
              </StyledTableCell>

              <StyledTableCell>
                {format(new Date(activityItem.createdAt), 'yyyy-MM-dd')}
              </StyledTableCell>
              <StyledTableCell>{activityItem.model}</StyledTableCell>
              <StyledTableCell>{activityItem.type}</StyledTableCell>
              <StyledTableCell>
                {JSON.stringify(activityItem.metadata)}
              </StyledTableCell>
            </StyledTableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ActivityTable;
