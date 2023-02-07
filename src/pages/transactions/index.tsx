import { useState, useEffect } from 'react';
import {
  TransactionsHeader,
  TransactionsTable,
  TransactionsPagination,
} from '@/modules/Transactions';
import { DashboardLayout } from '@/layouts';
import { AwardType } from '@/types';
import { Divider } from '@mui/material';
import { useAward } from '@/hooks';

const TransactionsPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { awards, pageInfo, onGetAwards } = useAward();
  const [transactionList, setTransactionList] = useState<AwardType[]>([]);
  const [searchType, setSearchType] = useState(0);

  useEffect(() => {
    console.log(awards);
    setTransactionList(awards);
  }, [awards]);

  useEffect(() => {
    handleSearch();
  }, [page, rowsPerPage]);

  const handleSearch = () => {
    onGetAwards({
      filterBy: {
        search: searchValue,
      },
      cursor: { page: page, size: rowsPerPage },
    });
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
      <TransactionsTable transactionTableData={transactionList} />
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
