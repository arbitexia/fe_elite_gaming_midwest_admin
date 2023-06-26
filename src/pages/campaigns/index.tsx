import React, { useEffect, useState } from 'react';
import { ConfigInfoCard } from '@/modules/Config';
import { DashboardLayout } from '@/layouts';
import { CampaignType, ConfigInputType } from '@/types';
import { useAppToast } from '@/providers';
import {
  CampaignHeader,
  CampaignListPagination,
  CampaignListTable,
  CampaignOverview,
} from '@/modules/Campaign';
import { Divider, Typography } from '@mui/material';
import {
  initCampaignData,
  initCampaignInformational,
  initCampaignOnDemand,
} from '@/_mock/campaigns';
import { UIInfoTitle } from '@/components/UI';

const CampaignsPage = () => {
  const appToast = useAppToast();
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleTableAction = (
    data: CampaignType.Data,
    type: 'edit' | 'delete'
  ) => {
    if (data && type === 'edit') {
    } else if (data && type === 'delete') {
    }
  };

  return (
    <DashboardLayout title="Campaigns">
      <CampaignHeader
        searchValue={searchValue}
        onValueChange={(value) => setSearchValue(value)}
      />
      <Divider sx={{ my: '18px' }} />
      <CampaignOverview />
      <UIInfoTitle sx={{ fontSize: 18, width: 'auto' }}>Auto-Pilot</UIInfoTitle>
      <CampaignListTable
        campaignTableData={initCampaignData}
        onAction={handleTableAction}
      />
      <UIInfoTitle sx={{ mt: 2, fontSize: 18, width: 'auto' }}>
        On Demand
      </UIInfoTitle>
      <CampaignListTable
        campaignTableData={initCampaignOnDemand}
        onAction={handleTableAction}
      />
      <UIInfoTitle sx={{ mt: 2, fontSize: 18, width: 'auto' }}>
        Informational
      </UIInfoTitle>
      <CampaignListTable
        campaignTableData={initCampaignInformational}
        onAction={handleTableAction}
      />
      <CampaignListPagination
        page={page}
        rowsPerPage={rowsPerPage}
        // total={pageInfo?.total ?? 0}
        total={1}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
      />
    </DashboardLayout>
  );
};

export default CampaignsPage;
