import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Divider } from '@mui/material';
import { useReward } from '@/hooks';
import { DashboardLayout } from '@/layouts';
import {
  RewardsListHeader,
  RewardCreateDialog,
  RewardCard,
} from '@/modules/Rewards';
import { Reward } from '@/types';
import { useAppToast } from '@/providers';

const Rewards = () => {
  const router = useRouter();
  const { rewards, onFilterRewards, onDeleteReward, onUpdateRewards } =
    useReward();
  const appToast = useAppToast();
  const [searchValue, setSearchValue] = useState('');
  const [isOpenCreateDlg, setIsOpenCreateDlg] = useState<boolean>(false);

  useEffect(() => {
    fetchRewards();
  }, [router, searchValue]);

  const fetchRewards = async () => {
    try {
      await onFilterRewards({
        filterBy: { search: searchValue },
        cursor: { page: 0, size: 1000 },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (rewardId: number) => {
    await onDeleteReward({ id: rewardId });
    await fetchRewards();
  };
  const handleEdit = async (value: Reward.Data) => {
    await onUpdateRewards(value);
    await fetchRewards();
    appToast({
      severity: 'success',
      message: 'The reward has been updated!',
    });
  };
  return (
    <DashboardLayout title="Rewards">
      <RewardsListHeader
        searchValue={searchValue}
        onValueChange={(value: string) => setSearchValue(value)}
        onOpenDlg={() => setIsOpenCreateDlg(true)}
      />
      <Divider sx={{ mt: '18px', mb: '30px' }} />
      <RewardCard
        rewards={rewards}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      <RewardCreateDialog
        isOpenCreateDlg={isOpenCreateDlg}
        closeDlg={async () => {
          await fetchRewards();
          setIsOpenCreateDlg(false);
        }}
      />
    </DashboardLayout>
  );
};

export default Rewards;
