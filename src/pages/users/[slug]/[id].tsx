import { useEffect, useState } from 'react';
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
  const [isTablet, setIsTablet] = useState<boolean>(false);
  const { currentUser, currentId, onUserSelect } = useUser();
  const { points, onGetPoints } = usePoint();
  const { id } = router.query;

  useEffect(() => {
    if (currentUser) setIsTablet(currentUser.roleId === 3);
  }, [currentUser]);

  useEffect(() => {
    onUserSelect(parseInt(id as string));
  }, [id]);

  useEffect(() => {
    let param: GetPointParam = {
      userId: parseInt(id as string),
    };
    onGetPoints(param);
  }, [currentId]);

  return (
    <DashboardLayout title="Users">
      {currentId === parseInt(id as string) && currentUser && (
        <Stack direction="column" spacing={2.5} paddingTop={4}>
          <UserDetailInfoCard user={currentUser} />
          {!isTablet && <UserDetailRequestCard />}
          {!isTablet && (
            <UIFlexWrapBox sx={{ gap: '20px' }}>
              <UserDetailPointsCard points={points} />
              <UserDetailTransactionCard />
            </UIFlexWrapBox>
          )}

          <UIFlexWrapBox sx={{ gap: '20px' }}>
            {!isTablet && <UserDetailRewardsCard />}
            <UserDetailActivityCard />
          </UIFlexWrapBox>
        </Stack>
      )}
    </DashboardLayout>
  );
};

export default UsersDetailPage;
