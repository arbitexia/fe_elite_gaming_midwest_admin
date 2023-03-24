import { useState, useEffect } from 'react';
import {
  TransactionsHeader,
  TransactionsTable,
  TransactionsPagination,
} from '@/modules/Transactions';
import { DashboardLayout } from '@/layouts';
import { GetAwardsParam } from '@/types';
import { Divider } from '@mui/material';
import { useAward } from '@/hooks/award';

const TransactionsPage = () => {
  const { awards, onGetAwards, pageInfo } = useAward();
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  useEffect(() => {
    const loadAwards = async () => {
      try {
        await fetchAwards({
          filterBy: {
            search: searchValue,
          },
          cursor: { page, size: rowsPerPage },
        });
      } catch (error) {
        console.log(error);
      }
    };

    loadAwards();
  }, [page, rowsPerPage, searchValue]);

  const fetchAwards = async (filter: GetAwardsParam) => {
    await onGetAwards(filter);
  };
  // useEffect(() => {
  //   setTransactionList(() => {
  //     return transactionData.filter((item) => {
  //       const customer = `${item.user.firstName} ${item.user.lastName}`;
  //       const assignee = `${item.assignee.firstName} ${item.assignee.lastName}`;

  //       return (
  //         (customer.toLowerCase().includes(searchValue.toLowerCase()) ||
  //           assignee.toLowerCase().includes(searchValue.toLowerCase()) ||
  //           item.reward.product.name
  //             .toLowerCase()
  //             .includes(searchValue.toLowerCase())) &&
  //         (searchType === 0 ||
  //           item.type === transactionsType[searchType - 1].value)
  //       );
  //     });
  //   });
  // }, [searchValue, searchType]);
  return (
    <DashboardLayout title="Transactions">
      <TransactionsHeader
        searchValue={searchValue}
        searchType={searchType}
        onValueChange={(value: string) => setSearchValue(value)}
        onTypeChange={(value: number) => setSearchType(value)}
      />
      <Divider sx={{ mt: '30px' }} />
      <TransactionsTable transactionTableData={awards} />
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
