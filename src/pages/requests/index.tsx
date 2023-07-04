import { useState, useEffect } from 'react';
import { Divider } from '@mui/material';
import { RequestsHeader, RequestTable } from '@/modules/Requests';
import { DashboardLayout } from '@/layouts';
import { TransactionType } from '@/types';
import { useAuth, useTransaction } from '@/hooks';
import { TransactionStatus, UserRoleIDEnum } from '@/constants';
import RequestsPagination from '@/modules/Requests/List/Pagination';
import { useAppToast } from '@/providers';

const Requests = () => {
  const { me } = useAuth();
  const { transactions, onGetTransactions, pageInfo, onUpdateTransaction } =
    useTransaction();

  const appToast = useAppToast();
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [requestList, setRequestList] = useState<TransactionType.Data[]>([]);
  const [isChanged, setIsChanged] = useState(false);
  useEffect(() => {
    fetchTransaction();
    if (isChanged) {
      setIsChanged(false);
    }
  }, [searchValue, page, rowsPerPage, isChanged]);

  const fetchTransaction = async () => {
    await onGetTransactions({
      filterBy: {
        search: searchValue,
        status: TransactionStatus.WAITING,
        ...(me?.roleId === UserRoleIDEnum.ADMIN && {
          locationId: me?.userLocations?.[0]?.locationId,
        }),
      },
      cursor: { page: page, size: rowsPerPage },
    });
  };

  useEffect(() => {
    if (transactions) {
      setRequestList(transactions);
    }
  }, [transactions]);

  const handleAction = async (data: TransactionType.Param) => {
    await onUpdateTransaction(data);
    appToast({
      severity: 'success',
      message:
        data.status === TransactionStatus.ACCEPTED ? 'Accepted!' : 'Declined!',
    });
    setIsChanged(true);
  };
  return (
    <DashboardLayout title="Locations">
      <RequestsHeader
        searchValue={searchValue}
        onValueChange={(value) => setSearchValue(value)}
      />
      <Divider sx={{ my: '30px' }} />
      <RequestTable requestsData={requestList} onAction={handleAction} />
      <RequestsPagination
        page={page}
        rowsPerPage={rowsPerPage}
        total={pageInfo?.total ?? 0}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
      />
    </DashboardLayout>
  );
};

export default Requests;
