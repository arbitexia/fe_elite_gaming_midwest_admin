import { Box, Grid, Typography } from '@mui/material';
import { Print } from '@mui/icons-material';
import { UIFlexSpaceBox, UIActionButton, UIImage } from '@/components/UI';
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
import { useAppToast } from '@/providers';

const TransactionDetail = ({ transactionItem }: TransactionsProps) => {
  const appToast = useAppToast();
  return (
    <Box>
      <UIFlexSpaceBox sx={{ mb: '30px', mt: 4 }}>
        <StyledOrderModalHeading>
          Transactions #{transactionItem.id} Details
        </StyledOrderModalHeading>
        <UIActionButton
          icon={<Print />}
          color="#667180"
          title="Print"
          handleClick={() => {
            console.log('Toast');
            appToast({
              severity: 'success',
              message: 'Print',
            });
          }}
        />
      </UIFlexSpaceBox>
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
              <Typography>
                {transactionItem.userLocation?.user?.fullName ?? ''}
              </Typography>
              <Typography>
                {transactionItem.userLocation?.user?.address?.address1 ?? '-'}
              </Typography>
              <Typography>
                Phone: {transactionItem.userLocation?.user?.phone ?? '-'}
              </Typography>

              <Box component="div">
                <Typography variant="h5">Date Create</Typography>
                <Typography>
                  {transactionItem.createdAt
                    ? format(new Date(transactionItem.createdAt), 'yyyy-MM-dd')
                    : '-'}
                </Typography>
              </Box>
            </StyledGridBox>
          </Grid>

          <Grid item xs={6}>
            <StyledGridBox component="div">
              <Typography variant="h5">Assignee</Typography>
              <Typography>
                {transactionItem.assignee?.fullName ?? ''}
              </Typography>
              <Typography>
                {transactionItem.assignee?.address?.address1 ?? '-'}
              </Typography>
              <Typography>
                Email: {transactionItem.assignee?.email ?? '-'}
              </Typography>

              <Box component="div">
                <Typography variant="h5">Date Accepted</Typography>
                <Typography>
                  {transactionItem.updatedAt
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
    </Box>
  );
};
export default TransactionDetail;
