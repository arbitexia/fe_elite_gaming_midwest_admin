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
import {
  useUser,
  usePoint,
  useReward,
  useActivity,
  useTransaction,
} from '@/hooks';
import { GetPointParam } from '@/types';
import { TransactionStatus } from '@/constants';

const UsersDetailPage = () => {
  const router = useRouter();
  const { currentUser, currentId, onUserSelect } = useUser();
  const { points, onGetPoints } = usePoint();
  const { availableRewards, onRewardsByUserId } = useReward();
  const { activities, onFilterActivities } = useActivity();
  const { transactions, onGetTransactions } = useTransaction();

  const { id } = router.query;
  const param: GetPointParam = { userId: parseInt(id as string) };
  useEffect(() => {
    if (param?.userId) {
      onUserSelect(param?.userId);
      onGetPoints(param);
      onRewardsByUserId(param);
      onFilterActivities({
        filterBy: { userId: param.userId },
        cursor: { page: 0, size: 5 },
      });
      onGetTransactions({
        filterBy: { search: '' },
        cursor: { page: 0, size: 20 },
      });
    }
  }, [id]);

  const handleClickLoadMore = async () => {
    if (param) {
      await onGetPoints(param);
    }
  };

  return (
    <DashboardLayout title="Users">
      {currentId === parseInt(id as string) && currentUser && (
        <Stack direction="column" spacing={2.5}>
          <UserDetailInfoCard user={currentUser} />
          <UserDetailRequestCard
            requests={transactions.filter(
              (t) => t.status === TransactionStatus.WAITING
            )}
          />
          <UIFlexWrapBox sx={{ gap: '20px' }}>
            <UserDetailPointsCard
              points={points}
              onLoadMore={handleClickLoadMore}
            />
            <UserDetailTransactionCard
              transactions={transactions.filter(
                (t) => t.status !== TransactionStatus.WAITING
              )}
            />
          </UIFlexWrapBox>
          <UIFlexWrapBox sx={{ gap: '20px' }}>
            <UserDetailRewardsCard rewards={availableRewards} />
            <UserDetailActivityCard activities={activities} />
          </UIFlexWrapBox>
        </Stack>
      )}
    </DashboardLayout>
  );
};

export default UsersDetailPage;
