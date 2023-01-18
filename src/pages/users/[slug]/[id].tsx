import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Stack } from '@mui/material';
import { UIFlexWrapBox } from '@/components/UI';
import {
  UserDetailInfoCard,
  UserDetailRequestCard,
  UserDetailPointsCard,
  UserDetailTransactionCard,
  UserDetailRewardsCard,
  UserDetailActivityCard,
} from '@/modules/Users';
import { DashboardLayout } from '@/layouts';
import { useUser } from '@/hooks';

const UsersDetailPage = () => {
  const router = useRouter();
  const { currentUser, currentId, onUserSelect } = useUser();
  const { id } = router.query;

  useEffect(() => {
    onUserSelect(parseInt(id as string));
  }, [id]);

  return (
    <DashboardLayout title="Users">
      {currentId === parseInt(id as string) && currentUser && (
        <Stack direction="column" spacing={2.5} paddingTop={4}>
          <UserDetailInfoCard user={currentUser} />
          <UserDetailRequestCard />
          <UIFlexWrapBox sx={{ gap: '20px' }}>
            <UserDetailPointsCard />
            <UserDetailTransactionCard />
          </UIFlexWrapBox>
          <UIFlexWrapBox sx={{ gap: '20px' }}>
            <UserDetailRewardsCard />
            <UserDetailActivityCard />
          </UIFlexWrapBox>
        </Stack>
      )}
    </DashboardLayout>
  );
};

export default UsersDetailPage;
