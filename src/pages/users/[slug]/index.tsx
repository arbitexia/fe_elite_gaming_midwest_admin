import { useState, useEffect } from 'react';
import { Divider } from '@mui/material';
import {
  UsersListHeader,
  UsersListPagination,
  UsersListTable,
} from '@/modules/Users';
import { DashboardLayout } from '@/layouts';
import { slugIndex } from '@/_mock/users';
import { UserType } from '@/types';
import { useRouter } from 'next/router';
import { useUser } from '@/hooks';

const UsersListPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { users, pageInfo, onGetUsers } = useUser();
  const [userList, setUserList] = useState<UserType.User[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchStatus, setSearchStatus] = useState('ALL');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    setUserList(users);
  }, [users]);

  useEffect(() => {
    handleSearch();
  }, [searchStatus, searchValue, page, rowsPerPage, slug]);

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
      <UsersListTable usersTableData={userList} />
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
