import { TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { StyledTable, TableHeadCell } from './ui';
import { TransactionDetailProps } from './Detail';

const DetailTable = ({ transaction }: TransactionDetailProps) => {
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
        <TableRow key={transaction.id}>
          <TableCell component="th" scope="row">
            {transaction.id}
          </TableCell>
          <TableCell align="left">
            {transaction?.reward?.product?.name ?? '-'}
          </TableCell>
          <TableCell align="left">
            {transaction?.reward?.product?.short ?? '-'}
          </TableCell>
          <TableCell>{transaction?.location?.name}</TableCell>
          <TableCell align="right">{transaction?.amount} Point</TableCell>
          <TableCell align="right">
            {transaction?.reward?.product?.status}
          </TableCell>
        </TableRow>
      </TableBody>
    </StyledTable>
  );
};

export default DetailTable;
