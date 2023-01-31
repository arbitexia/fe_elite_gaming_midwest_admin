import { Stack } from '@mui/material';
import { UserDetailInfoEditCard } from '@/modules/Users';
import { DashboardLayout } from '@/layouts';
import { UserType } from '@/types';

const UsersDetailPage = () => {
  const initUserData: UserType.User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    address: {
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipcode: '',
      country: '',
    },
    phone: '',
    birthday: '',
    createdAt: '',
  };
  return (
    <DashboardLayout title="Users">
      <Stack direction="column" spacing={2.5} paddingTop={4}>
        <UserDetailInfoEditCard user={initUserData} />
      </Stack>
    </DashboardLayout>
  );
};

export default UsersDetailPage;
