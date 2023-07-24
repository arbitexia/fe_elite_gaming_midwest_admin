import { jwtAxios } from './axios.api';
import { getAuthorizeHeader } from '@/libs/data-helper';
import { BackOfficeType, ConfigInputType } from '@/types';

export const getConfig = async () => {
  const response = await jwtAxios.get(`/configs`, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const createConfig = async (params: ConfigInputType) => {
  const response = await jwtAxios.post(`/configs`, params, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const saveBackOffice = async (params: BackOfficeType[]) => {
  const response = await jwtAxios.post(`/backOffice`, params, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const getBackOffice = async () => {
  const response = await jwtAxios.get(`/backOffice`, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};
