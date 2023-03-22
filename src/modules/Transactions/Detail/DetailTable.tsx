import { TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { TransactionsProps } from '@/types';
import { StyledTable, TableHeadCell } from './ui';
import { TransactionDetailProps } from './Detail';

const DetailTable = ({ transactionItem }: TransactionDetailProps) => {
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
            {transactionItem.id}
          </TableCell>
          <TableCell align="left">
            {transactionItem?.product?.name ?? '-'}
          </TableCell>
          <TableCell align="left">
            {transactionItem?.product?.short ?? '-'}
          </TableCell>
          <TableCell>{transactionItem?.userLocation?.location?.name}</TableCell>
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
