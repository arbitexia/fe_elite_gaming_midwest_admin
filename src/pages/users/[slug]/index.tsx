import { Divider } from '@mui/material';
import {
  UsersListHeader,
  UsersListPagination,
  UsersListTable,
} from '@/modules/Users';
import { DashboardLayout } from '@/layouts';

const UsersListPage = () => {
  return (
    <DashboardLayout bg="#F8F8F8" title="Users">
      <UsersListHeader />
      <Divider sx={{ mt: '30px' }} />
      <UsersListTable />
      <UsersListPagination />
    </DashboardLayout>
  );
};

export default UsersListPage;
