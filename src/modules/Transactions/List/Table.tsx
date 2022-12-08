import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Table,
  TableHead,
  TableBody,
  IconButton,
  Divider,
} from '@mui/material';
import { MoreHoriz as MoreHorizIcon } from '@mui/icons-material';
import { UIChip } from '@/components/UI';
import {
  StyledTableRow,
  StyledTableCell,
  StyledOptionMenuItemText,
  StyledOptionMenu,
  StyledOptionMenuItem,
} from './ui';
import { menuActions } from '@/_mock/users';
import { getColor } from '@/libs/data-helper';
import { MenuAction } from '@/constants/Enum';
import { TransactionType } from '@/types';

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

  return (
    <Table>
      <TableHead>
        <StyledTableRow>
          <StyledTableCell>Id</StyledTableCell>
          <StyledTableCell>Customer</StyledTableCell>
          <StyledTableCell>Product</StyledTableCell>
          <StyledTableCell>Amount</StyledTableCell>
          <StyledTableCell>Type</StyledTableCell>
          <StyledTableCell>Assignee</StyledTableCell>
          <StyledTableCell align="center">Status</StyledTableCell>
          <StyledTableCell align="center">Due Date</StyledTableCell>
          <StyledTableCell />
        </StyledTableRow>
      </TableHead>
      <TableBody>
        {transactionTableData.map((transactionItem) => {
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
                sx={{ cursor: 'pointer' }}
              >
                #{transactionItem.id}
              </StyledTableCell>
              <StyledTableCell>
                {`${transactionItem.user.firstName} ${transactionItem.user.lastName}`}
              </StyledTableCell>

              <StyledTableCell>{transactionItem.reward.name}</StyledTableCell>
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
