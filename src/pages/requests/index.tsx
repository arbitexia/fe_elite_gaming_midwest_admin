import { useState, useEffect } from 'react';
import { Divider } from '@mui/material';
import { RequestsHeader, RequestTable } from '@/modules/Requests';
import { DashboardLayout } from '@/layouts';
import { TransactionType } from '@/types';
import { useTransaction } from '@/hooks';
import { TransactionStatus } from '@/constants';

const Requests = () => {
  const { transactions, onGetTransactions, onUpdateTransaction } =
    useTransaction();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetchTransaction();
  }, [searchValue]);

  const fetchTransaction = async () => {
    await onGetTransactions({
      filterBy: { search: searchValue, status: TransactionStatus.WAITING },
      cursor: { page: 0, size: 1000 },
    });
  };

  const handleAction = async (data: TransactionType.Param) => {
    await onUpdateTransaction(data);
    await fetchTransaction();
  };
  return (
    <DashboardLayout title="Locations">
      <RequestsHeader
        searchValue={searchValue}
        onValueChange={(value) => setSearchValue(value)}
      />
      <Divider sx={{ my: '30px' }} />
      <RequestTable requestsData={transactions} onAction={handleAction} />
    </DashboardLayout>
  );
};

export default Requests;
