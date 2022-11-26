import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Stack } from '@mui/material';
import { UserDetailInfoEditCard } from '@/modules/Users';
import { DashboardLayout } from '@/layouts';
import { UserType } from '@/types';
import { usersTableData } from '@/_mock/users';

const UsersDetailPage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserType | null>(null);
  const { id } = router.query;

  useEffect(() => {
    usersTableData.forEach((item) => {
      if (item.id === parseInt(id as string)) setUserData(item);
    });
  }, [userData, id]);

  return (
    <DashboardLayout bg="#F8F8F8" title="Users">
      {userData && (
        <Stack direction="column" spacing={2.5} paddingTop={4}>
          <UserDetailInfoEditCard user={userData} />
        </Stack>
      )}
    </DashboardLayout>
  );
};

export default UsersDetailPage;
