import { useState, useEffect } from 'react';
import {
  TransactionsHeader,
  TransactionsTable,
  TransactionsPagination,
} from '@/modules/Transactions';
import { DashboardLayout } from '@/layouts';
import { Divider } from '@mui/material';
import { useTransaction } from '@/hooks';
import { TransactionStatus } from '@/constants';

const TransactionsPage = () => {
  const { transactions, pageInfo, onGetTransactions, onDeleteTransaction } =
    useTransaction();
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchTransactions();
  }, [page, rowsPerPage, searchValue]);

  const fetchTransactions = async () => {
    try {
      await onGetTransactions({
        filterBy: {
          search: searchValue,
          status: TransactionStatus.ACCEPTED,
        },
        cursor: { page, size: rowsPerPage },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (transactionId: number) => {
    await onDeleteTransaction({ id: transactionId });
    await fetchTransactions();
  };

  return (
    <DashboardLayout title="Transactions">
      <TransactionsHeader
        searchValue={searchValue}
        searchType={searchType}
        onValueChange={(value: string) => setSearchValue(value)}
        onTypeChange={(value: number) => setSearchType(value)}
      />
      <Divider sx={{ mt: '30px' }} />
      <TransactionsTable
        transactionTableData={transactions}
        onDelete={handleDelete}
      />
      <TransactionsPagination
        page={page}
        rowsPerPage={rowsPerPage}
        total={pageInfo?.total ?? 0}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
      />
    </DashboardLayout>
  );
};

export default TransactionsPage;
