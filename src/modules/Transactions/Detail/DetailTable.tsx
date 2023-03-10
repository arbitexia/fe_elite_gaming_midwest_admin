import { TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { TransactionsProps } from '@/types';
import { StyledTable, TableHeadCell } from './ui';

const DetailTable = ({ transactionItem }: TransactionsProps) => {
  return (
    <StyledTable>
      <TableHead>
        <TableRow>
          <TableHeadCell>#</TableHeadCell>
          <TableHeadCell align="left">Name</TableHeadCell>
          <TableHeadCell align="left">Detail</TableHeadCell>
          <TableHeadCell align="left">Location</TableHeadCell>
          <TableHeadCell align="right">Points</TableHeadCell>
          <TableHeadCell align="right">Status</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow key={transactionItem.id}>
          <TableCell component="th" scope="row">
            {transactionItem.reward.id}
          </TableCell>
          <TableCell align="left">
            {transactionItem.reward.name ?? '-'}
          </TableCell>
          <TableCell align="left">
            {transactionItem.reward.short ?? '-'}
          </TableCell>
          <TableCell>{transactionItem.reward.location.name}</TableCell>
          <TableCell align="right">
            {transactionItem.reward.point} Point
          </TableCell>
          <TableCell align="right">{transactionItem.reward.status}</TableCell>
        </TableRow>
      </TableBody>
    </StyledTable>
  );
};

export default DetailTable;
