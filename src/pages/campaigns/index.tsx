import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/layouts';
import { CampaignType } from '@/types';
import { useAppToast } from '@/providers';
import {
  CampaignHeader,
  CampaignListTable,
  CampaignOverview,
} from '@/modules/Campaign';
import { Divider } from '@mui/material';
import { UIInfoTitle } from '@/components/UI';
import { useCampaign } from '@/hooks';
import { useRouter } from 'next/router';
import ConfirmModal from '@/components/App/Modal/ConfirmModal';
import { CampaignModelEnum } from '@/constants';

const CampaignsPage = () => {
  const router = useRouter();
  const appToast = useAppToast();
  const { campaigns, onGetCampaigns, onSaveCampaign, onDeleteCampaign } =
    useCampaign();
  const [searchValue, setSearchValue] = useState('');
  const [isChanged, setIsChanged] = useState(false);
  const [campaignDeleteId, setCampaignDeleteId] = useState<number>();
  useEffect(() => {
    onGetCampaigns({ filterBy: { search: searchValue } });
  }, [searchValue, isChanged]);

  const handleTableAction = (
    data: CampaignType.Data,
    type: 'edit' | 'delete' | 'enabled'
  ) => {
    if (data && type === 'edit') {
      router.push(`/campaigns/edit/${data.id}`);
    } else if (data && type === 'enabled') {
      onSaveCampaign({ input: data });
      setIsChanged(!isChanged);
    } else if (data && type === 'delete') {
      setCampaignDeleteId(data.id);
    }
  };
  const offerIssuedOverview =
    campaigns?.map((c) => c.total).reduce((prev, cur) => prev + cur, 0) ?? 0;
  const offerRedeemedOverview =
    campaigns?.map((c) => c.redeemed).reduce((prev, cur) => prev + cur, 0) ?? 0;
  return (
    <DashboardLayout title="Campaigns">
      <CampaignHeader
        searchValue={searchValue}
        onValueChange={(value) => setSearchValue(value)}
      />
      <Divider sx={{ my: '18px' }} />
      <CampaignOverview
        overviewInfo={{
          campaigns: campaigns?.length ?? 0,
          offerIssued: offerIssuedOverview,
          offersRedeemed: offerRedeemedOverview,
          Redeemed:
            offerRedeemedOverview > 0
              ? (offerRedeemedOverview / offerIssuedOverview) * 100
              : 0,
        }}
      />
      <UIInfoTitle sx={{ fontSize: 18, width: 'auto' }}>Auto-Pilot</UIInfoTitle>
      <CampaignListTable
        campaignTableData={
          campaigns
            ? campaigns.filter((c) => c.model === CampaignModelEnum.AUTO_PILOT)
            : []
        }
        onAction={handleTableAction}
      />
      <UIInfoTitle sx={{ mt: 2, fontSize: 18, width: 'auto' }}>
        On Demand
      </UIInfoTitle>
      <CampaignListTable
        campaignTableData={
          campaigns
            ? campaigns.filter((c) => c.model === CampaignModelEnum.ON_DEMAND)
            : []
        }
        onAction={handleTableAction}
      />
      <UIInfoTitle sx={{ mt: 2, fontSize: 18, width: 'auto' }}>
        Informational
      </UIInfoTitle>
      <CampaignListTable
        campaignTableData={
          campaigns
            ? campaigns.filter(
                (c) => c.model === CampaignModelEnum.INFORMATIONAL
              )
            : []
        }
        onAction={handleTableAction}
      />
      <ConfirmModal
        open={!!campaignDeleteId}
        onClose={() => {
          setCampaignDeleteId(undefined);
        }}
        title="Delete"
        content="Are you sure you want to remove this campaign?"
        onAction={() => {
          onDeleteCampaign(campaignDeleteId ?? 0);
          setCampaignDeleteId(undefined);
          setIsChanged(!isChanged);
        }}
      />
    </DashboardLayout>
  );
};

export default CampaignsPage;
