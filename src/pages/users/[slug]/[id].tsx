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
import { useUser, usePoint } from '@/hooks';
import { GetPointParam } from '@/types';

const UsersDetailPage = () => {
  const router = useRouter();
  const { currentUser, currentId, onUserSelect } = useUser();
  const { points, onGetPoints } = usePoint();
  const { id } = router.query;
  console.log('user detail page ---');
  useEffect(() => {
    onUserSelect(parseInt(id as string));
  }, [id]);

  useEffect(() => {
    let param: GetPointParam = {
      userId: parseInt(id as string),
    };
    onGetPoints(param);
    console.log(points);
  }, [currentId]);

  return (
    <DashboardLayout title="Users">
      {currentId === parseInt(id as string) && currentUser && (
        <Stack direction="column" spacing={2.5} paddingTop={4}>
          <UserDetailInfoCard user={currentUser} />
          <UserDetailRequestCard />
          <UIFlexWrapBox sx={{ gap: '20px' }}>
            <UserDetailPointsCard points={points} />
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
