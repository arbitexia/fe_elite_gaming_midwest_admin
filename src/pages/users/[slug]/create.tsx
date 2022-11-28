import { Stack } from '@mui/material';
import { UserDetailInfoEditCard } from '@/modules/Users';
import { DashboardLayout } from '@/layouts';
import { initUserData } from '@/_mock/users';

const UsersDetailPage = () => {
  return (
    <DashboardLayout title="Users">
      <Stack direction="column" spacing={2.5} paddingTop={4}>
        <UserDetailInfoEditCard user={initUserData} />
      </Stack>
    </DashboardLayout>
  );
};

export default UsersDetailPage;
