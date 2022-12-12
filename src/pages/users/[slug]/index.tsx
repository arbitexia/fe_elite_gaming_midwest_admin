import { useState, useEffect } from 'react';
import { Divider } from '@mui/material';
import {
  UsersListHeader,
  UsersListPagination,
  UsersListTable,
} from '@/modules/Users';
import { DashboardLayout } from '@/layouts';
import { usersTableData, slugIndex } from '@/_mock/users';
import { UserType } from '@/types';
import { useRouter } from 'next/router';

const UsersListPage = () => {
  const router = useRouter();
  const { slug } = router.query;
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
          (searchStatus === 0 || item.status === searchStatus) &&
          item.role === slugIndex[slug as keyof typeof slugIndex]
        );
      });
    });
  }, [searchValue, searchStatus, slug]);
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
