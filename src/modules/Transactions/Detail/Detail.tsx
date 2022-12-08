import { Box, Grid, Typography } from '@mui/material';
import { UIContainer, UIImage } from '@/components/UI';
import {
  StyledDetailBox,
  StyledDetailBoxHeader,
  StyledDetailGrid,
  StyledGridBox,
  StyledLabel,
  StyledStatusCol,
  StyledOrderModalHeading,
} from './ui';
import { TransactionsProps } from '@/types';
import DetailTable from './DetailTable';
import { format } from 'date-fns';

const TransactionDetail = ({ transactionItem }: TransactionsProps) => {
  return (
    <UIContainer maxWidth="xl">
      <StyledOrderModalHeading>
        Transactions #{transactionItem.id} Details
      </StyledOrderModalHeading>

      <StyledDetailBox component="div">
        <StyledDetailBoxHeader component="div">
          <UIImage src={'images/icons/logo.svg'} width={150} height={150} />

          <StyledStatusCol component="div">
            <StyledLabel variant="h6">{transactionItem.status}</StyledLabel>
            <Typography>#{transactionItem.id}</Typography>
          </StyledStatusCol>
        </StyledDetailBoxHeader>

        <StyledDetailGrid container>
          <Grid item xs={6}>
            <StyledGridBox component="div">
              <Typography variant="h5">Customer</Typography>
              <Typography>{`${transactionItem.user.firstName ?? '-'} ${
                transactionItem.user.lastName ?? '-'
              }`}</Typography>
              <Typography>
                {transactionItem?.user?.location?.address1 ?? '-'}
              </Typography>
              <Typography>
                Phone: {transactionItem?.user?.phonenumber ?? '-'}
              </Typography>

              <Box component="div">
                <Typography variant="h5">Date Create</Typography>
                <Typography>
                  {transactionItem?.createdAt
                    ? format(new Date(transactionItem.createdAt), 'yyyy-MM-dd')
                    : '-'}
                </Typography>
              </Box>
            </StyledGridBox>
          </Grid>

          <Grid item xs={6}>
            <StyledGridBox component="div">
              <Typography variant="h5">Assignee</Typography>
              <Typography>{`${transactionItem.assignee.firstName ?? '-'} ${
                transactionItem.assignee.lastName ?? '-'
              }`}</Typography>
              <Typography>
                {transactionItem?.assignee?.location?.address1 ?? '-'}
              </Typography>
              <Typography>
                Email: {transactionItem?.assignee?.email ?? '-'}
              </Typography>

              <Box component="div">
                <Typography variant="h5">Date Accepted</Typography>
                <Typography>
                  {transactionItem?.updatedAt
                    ? format(new Date(transactionItem.updatedAt), 'yyyy-MM-dd')
                    : '-'}
                </Typography>
              </Box>
            </StyledGridBox>
          </Grid>

          <Grid item xs={12}>
            <DetailTable transactionItem={transactionItem} />
          </Grid>
        </StyledDetailGrid>
      </StyledDetailBox>
    </UIContainer>
  );
};
export default TransactionDetail;
