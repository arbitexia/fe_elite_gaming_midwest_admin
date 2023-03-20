import { useState, useEffect } from 'react';
import {
  TransactionsHeader,
  TransactionsTable,
  TransactionsPagination,
} from '@/modules/Transactions';
import { DashboardLayout } from '@/layouts';
import { transactionData, transactionsType } from '@/_mock/transactions';
import { TransactionType } from '@/types';
import { Divider } from '@mui/material';

const TransactionsPage = () => {
  const [transactionList, setTransactionList] = useState<TransactionType[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState(0);

  useEffect(() => {
    setTransactionList(() => {
      return transactionData.filter((item) => {
        const customer = `${item.user.firstName} ${item.user.lastName}`;
        const assignee = `${item.assignee.firstName} ${item.assignee.lastName}`;

        return (
          (customer.toLowerCase().includes(searchValue.toLowerCase()) ||
            assignee.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.reward.product.name
              .toLowerCase()
              .includes(searchValue.toLowerCase())) &&
          (searchType === 0 ||
            item.type === transactionsType[searchType - 1].value)
        );
      });
    });
  }, [searchValue, searchType]);
  return (
    <DashboardLayout title="Rewards">
      <TransactionsHeader
        searchValue={searchValue}
        searchType={searchType}
        onValueChange={(value: string) => setSearchValue(value)}
        onTypeChange={(value: number) => setSearchType(value)}
      />
      <Divider sx={{ mt: '30px' }} />
      <TransactionsTable transactionTableData={transactionList} />
      <TransactionsPagination />
    </DashboardLayout>
  );
};

export default TransactionsPage;
