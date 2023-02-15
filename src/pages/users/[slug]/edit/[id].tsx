import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Stack } from '@mui/material';
import { UserDetailInfoEditCard } from '@/modules/Users';
import { DashboardLayout } from '@/layouts';
import { useUser } from '@/hooks';

const UsersDetailPage = () => {
  const router = useRouter();
  const { currentUser, currentId, onUserSelect } = useUser();
  const { id } = router.query;
  const { isReady } = router;

  useEffect(() => {
    if (id) onUserSelect(parseInt(id as string));
  }, [id, isReady]);

  return (
    <DashboardLayout title="Users">
      {currentId === parseInt(id as string) && currentUser && (
        <Stack direction="column" spacing={2.5} paddingTop={4}>
          <UserDetailInfoEditCard user={currentUser} />
        </Stack>
      )}
    </DashboardLayout>
  );
};

export default UsersDetailPage;
