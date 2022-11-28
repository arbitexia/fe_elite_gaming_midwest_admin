import { useState, useEffect } from 'react';
import { Divider } from '@mui/material';
import {
  UsersListHeader,
  UsersListPagination,
  UsersListTable,
} from '@/modules/Users';
import { DashboardLayout } from '@/layouts';
import { usersTableData } from '@/_mock/users';
import { UserType } from '@/types';

const UsersListPage = () => {
  const [userList, setUserList] = useState<UserType[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchStatus, setSearchStatus] = useState(0);

  useEffect(() => {
    setUserList(() => {
      return usersTableData.filter((item) => {
        const name = `${item.firstName} ${item.lastName}`;
        return (
          (name.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.phonenumber.includes(searchValue) ||
            item.email.toLowerCase().includes(searchValue.toLowerCase())) &&
          (searchStatus === 0 || item.status === searchStatus)
        );
      });
    });
  }, [searchValue, searchStatus]);
  return (
    <DashboardLayout title="Users">
      <UsersListHeader
        searchValue={searchValue}
        searchStatus={searchStatus}
        onValueChange={(value) => setSearchValue(value)}
        onStatusChange={(value) => setSearchStatus(value)}
      />
      <Divider sx={{ mt: '30px' }} />
      <UsersListTable usersTableData={userList} />
      <UsersListPagination />
    </DashboardLayout>
  );
};

export default UsersListPage;
