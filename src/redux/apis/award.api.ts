import { jwtAxios } from './axios.api';
import { getAuthorizeHeader } from '@/libs/data-helper';
import { CreateAwardParam, GetAwardsParam } from '@/types';

export const getAwards = async (params: GetAwardsParam) => {
  const response = await jwtAxios.get(`/awards`, {
    params,
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const getAward = async (id: number) => {
  const response = await jwtAxios.get(`/awards/${id}`, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const createAward = async (params: CreateAwardParam) => {
  const response = await jwtAxios.post(`/awards`, params, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const acceptAward = async (id: number) => {
  const response = await jwtAxios.put(`/awards/${id}`, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const declineAward = async (id: number) => {
  const response = await jwtAxios.delete(`/awards/${id}`, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};
