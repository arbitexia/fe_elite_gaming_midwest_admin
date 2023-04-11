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
import RewardDetailTable from '@/modules/Rewards/List/RewardDetailTable';

const Rewards = () => {
  const router = useRouter();
  const { rewards, onFilterRewards, onDeleteReward } = useReward();
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
  return (
    <DashboardLayout title="Rewards">
      <RewardsListHeader
        searchValue={searchValue}
        onValueChange={(value: string) => setSearchValue(value)}
        onOpenDlg={() => setIsOpenCreateDlg(true)}
      />
      <Divider sx={{ mt: '18px', mb: '30px' }} />
      <RewardCard rewards={rewards} onDelete={handleDelete} />
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
