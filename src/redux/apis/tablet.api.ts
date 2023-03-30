import { TabletType } from '@/types';
import { jwtAxios } from './axios.api';
import { getAuthorizeHeader } from '@/libs/data-helper';

export const getTablets = async (params: TabletType.Param) => {
  const response = await jwtAxios.get(`/tablets`, {
    headers: getAuthorizeHeader(),
    params,
  });
  return response.data;
};

export const createTablet = async (params: TabletType.Input) => {
  const response = await jwtAxios.post(`/tablet`, params, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const updateTablet = async (params: TabletType.Input) => {
  const response = await jwtAxios.put(`/tablet`, params, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const deleteTablet = async (params: { id: number }) => {
  const response = await jwtAxios.delete(`/tablet/${params.id}`, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const changePasswordTablet = async (
  params: TabletType.ChangePasswordParam
) => {
  const response = await jwtAxios.post(`/tablet/password`, params, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};
