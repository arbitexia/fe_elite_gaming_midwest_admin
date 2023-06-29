import { useEffect } from 'react';
import { PayloadAction } from '@reduxjs/toolkit';
import { useAppToast } from '@/providers';
import {
  campaignSelector,
  resetCampaignMessage,
  getCampaigns,
  saveCampaign,
  deleteCampaign,
} from '@/redux/slices';
import { CampaignType } from '@/types';
import { useAppSelector, useAppDispatch } from './redux';

export const useCampaign = () => {
  const appToast = useAppToast();
  const { campaigns, pageInfo, loading, message, error } =
    useAppSelector(campaignSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loading) return;
    if (message) appToast({ severity: 'success', message: message });
    if (error) appToast({ severity: 'error', message: error });
    dispatch(resetCampaignMessage(null));
  }, [loading]);

  const onGetCampaigns = async (param: CampaignType.Filter) => {
    await dispatch(getCampaigns(param));
  };

  const onSelectCampaign = (id: number) => {
    return campaigns?.find((c) => c.id === id);
  };

  const onSaveCampaign = async (
    param: CampaignType.Body
  ): Promise<CampaignType.Data> => {
    const { payload }: PayloadAction<unknown> = await dispatch(
      saveCampaign(param)
    );
    return payload as CampaignType.Data;
  };

  const onDeleteCampaign = async (id: number) => {
    await dispatch(deleteCampaign({ id }));
  };

  return {
    campaigns,
    pageInfo,
    onGetCampaigns,
    onSaveCampaign,
    onDeleteCampaign,
    onSelectCampaign,
  };
};
