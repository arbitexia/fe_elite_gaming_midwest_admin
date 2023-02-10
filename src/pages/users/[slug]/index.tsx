import { useState, useEffect } from 'react';
import { Divider } from '@mui/material';
import {
  UsersListHeader,
  UsersListPagination,
  UsersListTable,
} from '@/modules/Users';
import { DashboardLayout } from '@/layouts';
import { slugIndex } from '@/_mock/users';
import { useRouter } from 'next/router';
import { useUser } from '@/hooks';

const UsersListPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { loading, users, pageInfo, onGetUsers } = useUser();
  const [searchValue, setSearchValue] = useState('');
  const [searchStatus, setSearchStatus] = useState('ALL');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    handleSearch();
  }, [searchStatus, page, rowsPerPage, slug]);

  const handleSearch = () => {
    onGetUsers({
      filterBy: {
        type: slugIndex[slug as keyof typeof slugIndex],
        status: searchStatus,
        search: searchValue,
      },
      cursor: { page: page, size: rowsPerPage },
    });
  };
  return (
    <DashboardLayout title="Users">
      <UsersListHeader
        onSearch={handleSearch}
        searchValue={searchValue}
        searchStatus={searchStatus}
        setSearchValue={setSearchValue}
        setSearchStatus={setSearchStatus}
      />
      <Divider sx={{ mt: '30px' }} />
      {!loading && <UsersListTable usersTableData={users} />}
      <UsersListPagination
        page={page}
        rowsPerPage={rowsPerPage}
        total={pageInfo?.total ?? 0}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
      />
    </DashboardLayout>
  );
};

export default UsersListPage;
