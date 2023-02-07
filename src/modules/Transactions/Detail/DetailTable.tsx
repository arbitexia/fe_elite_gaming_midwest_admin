import { TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { StyledTable, TableHeadCell } from './ui';
import { TransactionsProps } from '@/types';

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
            {transactionItem?.product?.id}
          </TableCell>
          <TableCell align="left">
            {transactionItem?.product?.name ?? '-'}
          </TableCell>
          <TableCell align="left">
            {transactionItem?.product?.short ?? '-'}
          </TableCell>
          <TableCell>{transactionItem?.product?.location?.name}</TableCell>
          <TableCell align="right">
            {transactionItem?.product?.point} Point
          </TableCell>
          <TableCell align="right">
            {transactionItem?.product?.status}
          </TableCell>
        </TableRow>
      </TableBody>
    </StyledTable>
  );
};

export default DetailTable;
