// import { useRouter } from 'next/router';
import { Stack } from '@mui/material';
import { UsersDetailHeader, UserDetailInfoEditCard } from '@/modules/Users';
import { DashboardLayout } from '@/layouts';

const UsersDetailPage = () => {
  // const router = useRouter();
  const userData = {
    id: 0,
    name: '',
    email: '',
    asset: '',
    location: '',
    phonenumber: '',
    birthday: '',
    role: 1,
    status: 1,
    createdAt: '',
  };

  return (
    <DashboardLayout bg="#F8F8F8" title="Users">
      {userData && (
        <Stack direction="column" spacing={2.5} paddingTop={4}>
          <UsersDetailHeader user={userData} />
          <UserDetailInfoEditCard user={userData} />
        </Stack>
      )}
    </DashboardLayout>
  );
};

export default UsersDetailPage;
