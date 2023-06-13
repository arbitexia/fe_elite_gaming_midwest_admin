import React, { useState } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableSortLabel,
  IconButton,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { UIListTableCell, UIListTableRow } from '@/components/UI';
import { useReward } from '@/hooks';
import { Reward } from '@/types';

const Row = ({ row, id }: { row: Reward.DataList; id: number }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <UIListTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <UIListTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </UIListTableCell>
        <UIListTableCell>{id + 1}</UIListTableCell>
        <UIListTableCell>{row.name}</UIListTableCell>
        <UIListTableCell align="center">{row.status}</UIListTableCell>
        <UIListTableCell align="center">{row.type}</UIListTableCell>
        <UIListTableCell align="center">{row.address.country}</UIListTableCell>
        <UIListTableCell align="center">{row.address.state}</UIListTableCell>
        <UIListTableCell align="center">{row.address.city}</UIListTableCell>
      </UIListTableRow>
    </>
  );
};

const RewardsTable = () => {
  type Order = 'asc' | 'desc';

  const { rewards } = useReward();
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Reward.DataList>('id');

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

  function descendingComparator(
    a: Reward.DataList,
    b: Reward.DataList,
    orderBy: keyof Reward.DataList
  ) {
    if (b[orderBy]! < a[orderBy]!) {
      return -1;
    }
    if (b[orderBy]! > a[orderBy]!) {
      return 1;
    }
    return 0;
  }

  function getComparator<Key extends keyof Reward.DataList>(
    order: Order,
    orderBy: Key
  ): (a: Reward.DataList, b: Reward.DataList) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Reward.DataList
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const createSortHandler =
    (property: keyof Reward.DataList) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };

  return (
    <Table>
      <TableHead>
        <UIListTableRow>
          <UIListTableCell />
          <UIListTableCell>
            <TableSortLabel
              active={orderBy === 'id'}
              direction={order}
              onClick={createSortHandler('id')}
            >
              Id
            </TableSortLabel>
          </UIListTableCell>
          <UIListTableCell>
            <TableSortLabel
              active={orderBy === 'name'}
              direction={order}
              onClick={createSortHandler('name')}
            >
              Name
            </TableSortLabel>
          </UIListTableCell>
          <UIListTableCell align="center">
            <TableSortLabel
              active={orderBy === 'status'}
              direction={order}
              onClick={createSortHandler('status')}
            >
              Status
            </TableSortLabel>
          </UIListTableCell>
          <UIListTableCell align="center">
            <TableSortLabel
              active={orderBy === 'type'}
              direction={order}
              onClick={createSortHandler('type')}
            >
              Type
            </TableSortLabel>
          </UIListTableCell>
          <UIListTableCell align="center">Country</UIListTableCell>
          <UIListTableCell align="center">State</UIListTableCell>
          <UIListTableCell align="center">City</UIListTableCell>
        </UIListTableRow>
      </TableHead>
      <TableBody>
        {stableSort<Reward.DataList>(
          rewards,
          getComparator(order, orderBy)
        ).map((rewardItem, index) => (
          <Row key={rewardItem.name} row={rewardItem} id={index} />
        ))}
      </TableBody>
    </Table>
  );
};

export default RewardsTable;
