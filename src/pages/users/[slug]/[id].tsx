import { Divider } from '@mui/material';
import {
  UsersDetailHeader,
  UsersListPagination,
  UsersListTable,
} from '@/modules/Users';
import { DashboardLayout } from '@/layouts';

const UsersDetailPage = () => {
  return (
    <DashboardLayout bg="#F8F8F8" title="Users">
      <UsersDetailHeader />
      <Divider sx={{ mt: '30px' }} />
      <UsersListTable />
      <UsersListPagination />
    </DashboardLayout>
  );
};

export default UsersDetailPage;
