import { useState, useEffect } from 'react';
import { Divider } from '@mui/material';
import {
  RequestsHeader,
  RequestTable,
  RequestsPagination,
} from '@/modules/Requests';
import { DashboardLayout } from '@/layouts';
import { AwardStatus } from '@/constants/Enum';
import { AwardType } from '@/types';
import { useAward } from '@/hooks';

const Requests = () => {
  const [requestList, setRequestList] = useState<AwardType[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { awards, pageInfo, onGetAwards } = useAward();

  useEffect(() => {
    console.log(awards);
    setRequestList(awards);
  }, [awards]);

  useEffect(() => {
    handleSearch();
  }, [page, rowsPerPage]);

  const handleSearch = () => {
    onGetAwards({
      filterBy: {
        status: AwardStatus.WAITING,
        search: searchValue,
      },
      cursor: { page: page, size: rowsPerPage },
    });
  };

  return (
    <DashboardLayout title="Requests">
      <RequestsHeader
        searchValue={searchValue}
        onValueChange={(value) => setSearchValue(value)}
      />
      <Divider sx={{ my: '30px' }} />
      <RequestTable requestsData={requestList} />
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
