import { format } from 'date-fns';
import { Box, Grid, Typography, Divider } from '@mui/material';
import { Print } from '@mui/icons-material';
import { UIFlexSpaceBox, UIActionButton, UIImage } from '@/components/UI';
import { TransactionType } from '@/types';
import { useAppToast } from '@/providers';
import DetailTable from './DetailTable';
import {
  StyledDetailBox,
  StyledDetailBoxHeader,
  StyledDetailGrid,
  StyledGridBox,
  StyledLabel,
  StyledStatusCol,
  StyledOrderModalHeading,
} from './ui';
import { formatPhoneNumber } from '@/libs/data-helper';

export type TransactionDetailProps = {
  transaction: TransactionType.Data;
};
const TransactionDetail = ({ transaction }: TransactionDetailProps) => {
  const appToast = useAppToast();
  return (
    <Box>
      <UIFlexSpaceBox sx={{ alignItems: 'center', gap: '12px' }}>
        <StyledOrderModalHeading>
          Transactions #{transaction.id} Details
        </StyledOrderModalHeading>
        <UIActionButton
          icon={<Print />}
          color="#667180"
          title="Print"
          handleClick={() => {
            appToast({
              severity: 'success',
              message: 'Print',
            });
          }}
        />
      </UIFlexSpaceBox>
      <Divider sx={{ mt: '18px', mb: '30px' }} />
      <StyledDetailBox component="div">
        <StyledDetailBoxHeader component="div">
          <UIImage src={'images/icons/logo.svg'} width={150} height={150} />

          <StyledStatusCol component="div">
            <StyledLabel variant="h6">{transaction.status}</StyledLabel>
            <Typography>#{transaction.id}</Typography>
          </StyledStatusCol>
        </StyledDetailBoxHeader>

        <StyledDetailGrid container>
          <Grid item xs={6}>
            <StyledGridBox component="div">
              <Typography variant="h5">Customer</Typography>
              <Typography>{`${transaction?.user?.firstName ?? '-'} ${
                transaction?.user?.lastName ?? '-'
              }`}</Typography>
              <Typography>
                {transaction?.location?.address?.address1 ?? '-'}
              </Typography>
              <Typography>
                Phone: {formatPhoneNumber(transaction?.user?.phone) ?? '-'}
              </Typography>

              <Box component="div">
                <Typography variant="h5">Date Create</Typography>
                <Typography>
                  {transaction?.createdAt
                    ? format(new Date(transaction.createdAt), 'yyyy-MM-dd')
                    : '-'}
                </Typography>
              </Box>
            </StyledGridBox>
          </Grid>

          <Grid item xs={6}>
            <StyledGridBox component="div">
              <Typography variant="h5">Assignee</Typography>
              <Typography>{`${transaction?.assignee?.firstName ?? '-'} ${
                transaction?.assignee?.lastName ?? '-'
              }`}</Typography>
              <Typography>
                {transaction?.assignee?.address?.address1 ?? '-'}
              </Typography>
              <Typography>
                Email: {transaction?.assignee?.email ?? '-'}
              </Typography>

              <Box component="div">
                <Typography variant="h5">Date Accepted</Typography>
                <Typography>
                  {transaction?.acceptedAt
                    ? format(new Date(transaction.acceptedAt), 'yyyy-MM-dd')
                    : '-'}
                </Typography>
              </Box>
            </StyledGridBox>
          </Grid>

          <Grid item xs={12}>
            <DetailTable transaction={transaction} />
          </Grid>
        </StyledDetailGrid>
      </StyledDetailBox>
    </Box>
  );
};
export default TransactionDetail;
