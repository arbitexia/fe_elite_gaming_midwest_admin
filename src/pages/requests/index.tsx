import { useState, useEffect } from 'react';
import { Divider } from '@mui/material';
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
          item.item.product.name
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        );
      });
    });
  }, [searchValue]);
  return (
    <DashboardLayout title="Locations">
      <RequestsHeader
        searchValue={searchValue}
        onValueChange={(value) => setSearchValue(value)}
      />
      <Divider sx={{ my: '30px' }} />
      <RequestTable requestsData={requestList} />
    </DashboardLayout>
  );
};

export default Requests;
