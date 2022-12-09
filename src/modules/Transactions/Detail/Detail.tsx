import { Box, Grid, Tooltip, Typography, IconButton } from '@mui/material';
import { Print } from '@mui/icons-material';
import { UIContainer, UIImage } from '@/components/UI';
import {
  StyledDetailBox,
  StyledDetailBoxHeader,
  StyledDetailGrid,
  StyledGridBox,
  StyledLabel,
  StyledStatusCol,
  StyledOrderModalHeading,
  StyledDetailHeader,
  StyledTooltipBox,
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

      <StyledDetailHeader
        component="div"
        sx={{ py: 2, justifyContent: 'flex-end' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <StyledTooltipBox component="div">
            <Tooltip title={'Print'}>
              <IconButton disableRipple>
                <Print sx={{ color: '#667180', fontSize: '13px' }} />
              </IconButton>
            </Tooltip>
            <Typography
              sx={{ color: '#667180', fontSize: '13px', fontWeight: 700 }}
            >
              Print
            </Typography>
          </StyledTooltipBox>
        </Box>
      </StyledDetailHeader>

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
