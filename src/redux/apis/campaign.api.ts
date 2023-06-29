import { jwtAxios } from './axios.api';
import { getAuthorizeHeader } from '@/libs/data-helper';
import { CampaignType } from '@/types';

export const getCampaigns = async (params: CampaignType.Filter) => {
  const response = await jwtAxios.get(`/campaigns`, {
    params,
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const saveCampaign = async (params: CampaignType.Body) => {
  const response = await jwtAxios.post(`/campaign`, params, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const deleteCampaign = async (params: CampaignType.Param) => {
  const response = await jwtAxios.delete(`/campaign/${params.id}`, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};
