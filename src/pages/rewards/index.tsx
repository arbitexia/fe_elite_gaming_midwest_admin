import React, { useEffect, useState } from 'react';
import { Divider } from '@mui/material';
import { useReward } from '@/hooks';
import { DashboardLayout } from '@/layouts';
import {
  RewardsListHeader,
  RewardCreatDialog,
  RewardsTable,
} from '@/modules/Rewards';
import { useRouter } from 'next/router';
import { Reward } from '@/types';

const Rewards = () => {
  const router = useRouter();
  const { rewards, onFilterRewards } = useReward();
  const [searchValue, setSearchValue] = useState('');
  const [isOpenCreateDlg, setIsOpenCreatDlg] = useState<boolean>(false);

  useEffect(() => {
    filterRewards({ condition: { search: searchValue } });
  }, [router]);

  const filterRewards = (filter: Reward.Filter) => {
    onFilterRewards(filter);
  };

  return (
    <DashboardLayout title="Rewards">
      <RewardsListHeader
        searchValue={searchValue}
        onValueChange={(value: string) => setSearchValue(value)}
        onOpenDlg={() => setIsOpenCreatDlg(true)}
      />
      <Divider sx={{ mt: '30px' }} />
      <RewardsTable />
      <RewardCreatDialog
        isOpenCreateDlg={isOpenCreateDlg}
        closeDlg={() => {
          setIsOpenCreatDlg(false);
        }}
      />
    </DashboardLayout>
  );
};

export default Rewards;
