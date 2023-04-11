import { jwtAxios } from './axios.api';
import { getAuthorizeHeader } from '@/libs/data-helper';
import { Reward } from '@/types';

export const filter = async (filter: Reward.Filter) => {
  const res = await jwtAxios.get('/rewards', {
    params: filter,
    headers: getAuthorizeHeader(),
  });
  return res.data;
};

export const create = async (body: Reward.Body) => {
  const res = await jwtAxios.post('/rewards', body, {
    headers: getAuthorizeHeader(),
  });
  return res.data;
};

export const getByUserId = async (param: { userId: number }) => {
  const res = await jwtAxios.get(`/rewards/user/${param.userId}`, {
    headers: getAuthorizeHeader(),
  });
  return res.data;
};

export const deleteById = async (param: Reward.Param) => {
  const res = await jwtAxios.delete(`/rewards/${param.id}`, {
    headers: getAuthorizeHeader(),
  });
  return res.data;
};
