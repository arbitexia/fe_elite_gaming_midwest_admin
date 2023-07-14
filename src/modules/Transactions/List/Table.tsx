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
import { menuTransactionActions } from '@/constants/user';
import { UIChip } from '@/components/UI';
import { CouponEnum, MenuAction } from '@/constants';
import { formatCurrency, getColor } from '@/libs/data-helper';
import { TransactionType } from '@/types';
import {
  StyledTableRow,
  StyledTableCell,
  StyledOptionMenuItemText,
  StyledOptionMenu,
  StyledOptionMenuItem,
} from './ui';
import { format } from 'date-fns';
import ConfirmModal from '@/components/App/Modal/ConfirmModal';

type TransactionsTableProps = {
  transactionTableData: TransactionType.Data[];
  onDelete: (id: number) => void;
};
type Order = 'asc' | 'desc';

const TransactionsTable = ({
  transactionTableData,
  onDelete,
}: TransactionsTableProps) => {
  const router = useRouter();

  const [anchorElOptionsMenu, setAnchorElOptionsMenu] =
    useState<null | HTMLElement>(null);
  const [deleteId, setDeleteId] = useState<number>();

  const isOptionsMenuOpen = Boolean(anchorElOptionsMenu);

  const handleNavBtnClick = (key: string) => {
    if (key === MenuAction.DELETE) {
      setDeleteId(
        parseInt(anchorElOptionsMenu?.getAttribute('data-key') ?? '0')
      );
    } else
      router.push(
        `${router.asPath}/${anchorElOptionsMenu?.getAttribute('data-key')}`
      );
  };

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
        {transactionTableData?.length > 0 ? (
          transactionTableData.map((transactionItem) => {
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
                  {`${transactionItem?.user?.firstName} ${transactionItem?.user?.lastName}`}
                </StyledTableCell>

                <StyledTableCell>
                  {transactionItem?.reward?.product?.name}
                </StyledTableCell>
                <StyledTableCell>
                  {transactionItem.type === CouponEnum.COUPON
                    ? formatCurrency(transactionItem?.amount)
                    : transactionItem?.amount}
                </StyledTableCell>
                <StyledTableCell>{transactionItem?.type}</StyledTableCell>
                <StyledTableCell>{`${transactionItem.assignee?.firstName} ${transactionItem.assignee?.lastName}`}</StyledTableCell>
                <StyledTableCell align="center">
                  <UIChip
                    label={transactionItem.status}
                    color={getColor(transactionItem.status)}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  {format(
                    new Date(transactionItem?.createdAt ?? '1900-12-12'),
                    'yyyy-MM-dd'
                  )}
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
          })
        ) : (
          <StyledTableRow
            sx={{
              position: 'relative',
              backgroundColor: 'transparent !important',
            }}
          >
            <StyledTableCell colSpan={8} sx={{ textAlign: 'center' }}>
              No Data
            </StyledTableCell>
          </StyledTableRow>
        )}
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
        {menuTransactionActions.map((item, index) => {
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

      <ConfirmModal
        open={!!deleteId}
        onClose={() => {
          setDeleteId(undefined);
        }}
        title="Delete"
        content="Are you sure you want to remove this transaction?"
        onAction={() => {
          onDelete && onDelete(deleteId ?? 0);
          setDeleteId(undefined);
        }}
      />
    </Table>
  );
};

export default TransactionsTable;
