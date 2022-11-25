import { Typography, Table, TableBody, TableRow } from '@mui/material';
import { UIFlexSpaceBox } from '@/components/UI';
import {
  StyledUserDetailCard,
  StyledUserRequestButton,
  StyledTransactionTableCell,
} from './ui';
import { userTransactionData } from '@/_mock/users';

const UserDetailTransactionCard = () => {
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
        <StyledUserRequestButton>All Transactions</StyledUserRequestButton>
      </UIFlexSpaceBox>
      <Table
        size="small"
        sx={{
          marginTop: '25px',
          borderCollapse: 'separate',
          borderSpacing: '0 3px',
        }}
      >
        <TableBody>
          {userTransactionData.map((data) => {
            return (
              <TableRow key={data.id}>
                <StyledTransactionTableCell sx={{ color: '#06251F' }}>
                  {data.createdAt}
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
