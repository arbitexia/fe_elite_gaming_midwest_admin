import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { UserDetailInfoEditCard } from '@/modules/Users';
import { DashboardLayout } from '@/layouts';
import { useUser } from '@/hooks';

const UsersDetailPage = () => {
  const router = useRouter();
  const { currentUser, currentId, onUserSelect } = useUser();
  const { id } = router.query;
  useEffect(() => {
    if (id) {
      onUserSelect(parseInt(id as string));
    }
  }, [id]);

  return (
    <DashboardLayout title="Users">
      {currentId === parseInt(id as string) && currentUser && (
        <UserDetailInfoEditCard user={currentUser} type={'edit'} />
      )}
    </DashboardLayout>
  );
};

export default UsersDetailPage;
