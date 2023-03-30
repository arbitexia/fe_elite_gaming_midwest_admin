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

const Rewards = () => {
  const router = useRouter();
  const { rewards, onFilterRewards } = useReward();
  const [searchValue, setSearchValue] = useState('');
  const [isOpenCreateDlg, setIsOpenCreateDlg] = useState<boolean>(false);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        await filterRewards({
          filterBy: { search: searchValue },
          cursor: { page: 0, size: 1000 },
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchRewards();
  }, [router, searchValue]);

  const filterRewards = async (filter: Reward.Filter) => {
    await onFilterRewards(filter);
  };
  return (
    <DashboardLayout title="Rewards">
      <RewardsListHeader
        searchValue={searchValue}
        onValueChange={(value: string) => setSearchValue(value)}
        onOpenDlg={() => setIsOpenCreateDlg(true)}
      />
      <Divider sx={{ mt: '18px', mb: '30px' }} />
      <RewardCard rewards={rewards} />
      <RewardCreateDialog
        isOpenCreateDlg={isOpenCreateDlg}
        closeDlg={async () => {
          await filterRewards({
            filterBy: { search: searchValue },
            cursor: { page: 0, size: 1000 },
          });
          setIsOpenCreateDlg(false);
        }}
      />
    </DashboardLayout>
  );
};

export default Rewards;
