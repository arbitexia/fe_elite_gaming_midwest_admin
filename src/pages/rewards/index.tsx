import { useState, useEffect } from 'react';
import {
  RewardsHeader,
  RewardsTable,
  RewardsPagination,
} from '@/modules/Rewards';
import { DashboardLayout } from '@/layouts';
import { rewardsData } from '@/_mock/rewards';
import { RewardItemType } from '@/types';
import { Divider } from '@mui/material';

const RewardsPage = () => {
  const [rewardList, setRewardList] = useState<RewardItemType[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchLocation, setSearchLocation] = useState(0);

  useEffect(() => {
    setRewardList(() => {
      return rewardsData.filter((item) => {
        return (
          item.name.toLowerCase().includes(searchValue.toLowerCase()) &&
          (searchLocation === 0 || item.location.id === searchLocation)
        );
      });
    });
  }, [searchValue, searchLocation]);
  return (
    <DashboardLayout title="Rewards">
      <RewardsHeader
        searchValue={searchValue}
        searchLocation={searchLocation}
        onValueChange={(value: string) => setSearchValue(value)}
        onLocationChange={(value: number) => setSearchLocation(value)}
      />
      <Divider sx={{ mt: '30px' }} />
      <RewardsTable rewardsTableData={rewardList} />
      <RewardsPagination />
    </DashboardLayout>
  );
};

export default RewardsPage;
