import { Typography, Table, TableBody, TableRow } from '@mui/material';
import { UIFlexSpaceBox, UIFlexCenterBox } from '@/components/UI';
import {
  StyledUserDetailCard,
  StyledUserRequestButton,
  StyledTransactionTableCell,
} from './ui';
import { TransactionType } from '@/types';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
type UserDetailTransactionCardProps = {
  transactions: TransactionType.Data[];
};
const UserDetailTransactionCard = ({
  transactions,
}: UserDetailTransactionCardProps) => {
  const router = useRouter();
  return (
    <StyledUserDetailCard>
      <UIFlexSpaceBox>
        <Typography
          sx={{
            ml: '15px',
            fontWeight: '600',
            fontSize: '18px',
            lineHeight: '17px',
            color: '#222B35',
          }}
        >
          Transactions
        </Typography>
        <StyledUserRequestButton onClick={() => router.push('/transactions')}>
          All Transactions
        </StyledUserRequestButton>
      </UIFlexSpaceBox>
      {transactions.length === 0 && (
        <UIFlexCenterBox>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            No Data Found
          </Typography>
        </UIFlexCenterBox>
      )}
      <Table
        size="small"
        sx={{
          marginTop: '25px',
          borderCollapse: 'separate',
          borderSpacing: '0 3px',
        }}
      >
        <TableBody>
          {transactions?.map((data) => {
            return (
              <TableRow key={data.id}>
                <StyledTransactionTableCell sx={{ color: '#06251F' }}>
                  {format(new Date(data.createdAt), 'yyyy-MM-dd hh:mm')}
                </StyledTransactionTableCell>
                <StyledTransactionTableCell
                  align="right"
                  sx={{
                    color: data.type === 'spend' ? '#06251F' : '#008A83',
                    fontWeight: 500,
                  }}
                >
                  {data.type === 'spend' ? '-$' : '+$'}
                  {data.amount}
                </StyledTransactionTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </StyledUserDetailCard>
  );
};

export default UserDetailTransactionCard;
