import { useState, useEffect } from 'react';
import {
  ActivityHeader,
  ActivityTable,
  ActivityPagination,
} from '@/modules/Activity';
import { DashboardLayout } from '@/layouts';
import { activityData } from '@/_mock/activity';
import { ActivityItemType } from '@/types';
import { Divider } from '@mui/material';

const ActivityPage = () => {
  const [activityList, setActivityList] = useState<ActivityItemType[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState('ALL');

  useEffect(() => {
    setActivityList(() => {
      return activityData.filter((item) => {
        const customer = `${item.user.firstName} ${item.user.lastName}`;
        return (
          customer.toLowerCase().includes(searchValue.toLowerCase()) &&
          (searchType === 'ALL' || item.model === searchType)
        );
      });
    });
  }, [searchValue, searchType]);
  return (
    <DashboardLayout title="Rewards">
      <ActivityHeader
        searchValue={searchValue}
        searchType={searchType}
        onValueChange={(value: string) => setSearchValue(value)}
        onTypeChange={(value: string) => setSearchType(value)}
      />
      <Divider sx={{ mt: '30px' }} />
      <ActivityTable activityTableData={activityList} />
      <ActivityPagination />
    </DashboardLayout>
  );
};

export default ActivityPage;
