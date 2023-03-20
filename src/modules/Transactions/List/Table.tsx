import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Table,
  TableHead,
  TableBody,
  IconButton,
  Divider,
  TableSortLabel,
} from '@mui/material';
import { MoreHoriz as MoreHorizIcon } from '@mui/icons-material';
import { menuActions } from '@/_mock/users';
import { UIChip } from '@/components/UI';
import { MenuAction } from '@/constants';
import { getColor } from '@/libs/data-helper';
import { TransactionType } from '@/types';
import {
  StyledTableRow,
  StyledTableCell,
  StyledOptionMenuItemText,
  StyledOptionMenu,
  StyledOptionMenuItem,
} from './ui';

type TransactionsTableProps = {
  transactionTableData: TransactionType[];
};

const TransactionsTable = ({
  transactionTableData,
}: TransactionsTableProps) => {
  const router = useRouter();
  const [anchorElOptionsMenu, setAnchorElOptionsMenu] =
    useState<null | HTMLElement>(null);
  const isOptionsMenuOpen = Boolean(anchorElOptionsMenu);

  const handleNavBtnClick = (key: string) => {
    console.log(anchorElOptionsMenu?.getAttribute('data-key'));
    if (key === MenuAction.DELETE) {
      //TODO Delete Action
    } else
      router.push(
        `${router.asPath}${
          key === MenuAction.EDIT ? '/edit' : ''
        }/${anchorElOptionsMenu?.getAttribute('data-key')}`
      );
  };
  type Order = 'asc' | 'desc';
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof TransactionType>('id');

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

  function getComparator<Key extends keyof TransactionType>(
    order: Order,
    orderBy: Key
  ): (a: TransactionType, b: TransactionType) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(
    a: TransactionType,
    b: TransactionType,
    orderBy: keyof TransactionType
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
    if (orderBy === 'assignee') {
      if (
        `${b.assignee.firstName} ${b.assignee.lastName}` <
        `${a.assignee.firstName} ${a.assignee.lastName}`
      ) {
        return -1;
      }
      if (
        `${b.assignee.firstName} ${b.assignee.lastName}` >
        `${a.assignee.firstName} ${a.assignee.lastName}`
      ) {
        return 1;
      }
    }
    if (orderBy === 'reward') {
      if (b.reward.product.name < a.reward.product.name) return -1;
      if (b.reward.product.name > a.reward.product.name) return 1;
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
    (property: keyof TransactionType) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof TransactionType
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
              Customer
            </TableSortLabel>
          </StyledTableCell>
          <StyledTableCell>
            <TableSortLabel
              active={orderBy === 'reward'}
              direction={order}
              onClick={createSortHandler('reward')}
            >
              Product
            </TableSortLabel>
          </StyledTableCell>
          <StyledTableCell>
            <TableSortLabel
              active={orderBy === 'amount'}
              direction={order}
              onClick={createSortHandler('amount')}
            >
              Amount
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
          <StyledTableCell>
            <TableSortLabel
              active={orderBy === 'assignee'}
              direction={order}
              onClick={createSortHandler('assignee')}
            >
              Assignee
            </TableSortLabel>
          </StyledTableCell>
          <StyledTableCell align="center">
            <TableSortLabel
              active={orderBy === 'status'}
              direction={order}
              onClick={createSortHandler('status')}
            >
              Status
            </TableSortLabel>
          </StyledTableCell>
          <StyledTableCell align="center">
            <TableSortLabel
              active={orderBy === 'createdAt'}
              direction={order}
              onClick={createSortHandler('createdAt')}
            >
              Due Date
            </TableSortLabel>
          </StyledTableCell>
          <StyledTableCell />
        </StyledTableRow>
      </TableHead>
      <TableBody>
        {stableSort<TransactionType>(
          transactionTableData,
          getComparator(order, orderBy)
        ).map((transactionItem) => {
          // const labelId = `enhanced-table-checkbox-${index}`;
          return (
            <StyledTableRow
              key={transactionItem.id}
              data-key={transactionItem.id}
              sx={{ position: 'relative' }}
            >
              <StyledTableCell
                onClick={() =>
                  router.push(`${router.asPath}/${transactionItem.id}`)
                }
                sx={{ cursor: 'pointer', pl: '30px' }}
              >
                #{transactionItem.id}
              </StyledTableCell>
              <StyledTableCell>
                {`${transactionItem.user.firstName} ${transactionItem.user.lastName}`}
              </StyledTableCell>

              <StyledTableCell>
                {transactionItem.reward.product.name}
              </StyledTableCell>
              <StyledTableCell>{transactionItem.amount}</StyledTableCell>
              <StyledTableCell>{transactionItem.type}</StyledTableCell>
              <StyledTableCell>{`${transactionItem.assignee.firstName} ${transactionItem.assignee.lastName}`}</StyledTableCell>
              <StyledTableCell align="center">
                <UIChip
                  label={transactionItem.status}
                  color={getColor(transactionItem.status)}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                {transactionItem.createdAt}
              </StyledTableCell>
              <StyledTableCell>
                <IconButton
                  data-key={transactionItem.id}
                  onClick={(event: React.MouseEvent<HTMLElement>) => {
                    setAnchorElOptionsMenu(event.currentTarget);
                  }}
                >
                  <MoreHorizIcon sx={{ color: '#83A9A8' }} />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          );
        })}
      </TableBody>

      <StyledOptionMenu
        PaperProps={{
          elevation: 0,
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        anchorEl={anchorElOptionsMenu}
        open={isOptionsMenuOpen}
        onClose={() => {
          setAnchorElOptionsMenu(null);
        }}
        onClick={() => {
          setAnchorElOptionsMenu(null);
        }}
      >
        {menuActions.map((item, index) => {
          return (
            <div key={index}>
              {index === 2 && <Divider />}
              <StyledOptionMenuItem
                disableRipple
                disableTouchRipple
                onClick={() => handleNavBtnClick(item.action)}
              >
                <StyledOptionMenuItemText
                  key={index}
                  sx={{
                    color: item.color,
                    textDecorationLine: index === 0 ? 'underline' : 'none',
                  }}
                >
                  {item.label}
                </StyledOptionMenuItemText>
              </StyledOptionMenuItem>
            </div>
          );
        })}
      </StyledOptionMenu>
    </Table>
  );
};

export default TransactionsTable;
