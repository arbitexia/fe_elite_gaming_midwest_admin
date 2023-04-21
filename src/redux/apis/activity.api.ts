import { jwtAxios } from './axios.api';
import { getAuthorizeHeader } from '@/libs/data-helper';
import { ActivityFilterType } from '@/types';

export const getActivities = async (params: ActivityFilterType) => {
  const response = await jwtAxios.get(`/activities`, {
    params,
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const deleteActivity = async (param: { id: number }) => {
  const response = await jwtAxios.delete(`/activity/${param.id}`, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};
