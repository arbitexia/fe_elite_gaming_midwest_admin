import { useState, useEffect } from 'react';
import { Divider } from '@mui/material';
import { UIContainer } from '@/components/UI';
import { RequestsHeader, RequestTable } from '@/modules/Requests';
import { DashboardLayout } from '@/layouts';
import { requestsData } from '@/_mock/requests';
import { RequestItemType } from '@/types';

const Requests = () => {
  const [requestList, setRequestList] = useState<RequestItemType[]>([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setRequestList(() => {
      return requestsData.filter((item) => {
        const userName = `${item.user.firstName} ${item.user.lastName}`;
        return (
          item.location.name
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          userName.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.item.name.toLowerCase().includes(searchValue.toLowerCase())
        );
      });
    });
  }, [searchValue]);
  return (
    <DashboardLayout title="Locations">
      <UIContainer sx={{ minHeight: 'calc(100vh - 86px)' }}>
        <RequestsHeader
          searchValue={searchValue}
          onValueChange={(value) => setSearchValue(value)}
        />
        <Divider sx={{ my: '20px' }} />
        <RequestTable requestsData={requestList} />
      </UIContainer>
    </DashboardLayout>
  );
};

export default Requests;
