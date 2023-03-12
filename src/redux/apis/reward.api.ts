import { jwtAxios } from './axios.api';
import { getAuthorizeHeader } from '@/libs/data-helper';
import { CreateRewardParam } from '@/types';

export const createReward = async (params: CreateRewardParam) => {
  const response = await jwtAxios.post('/rewards', params, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const getProductsByLocationId = async (id: number) => {
  const response = await jwtAxios.post(
    '/rewards/get_products_by_location_id',
    { id },
    {
      headers: getAuthorizeHeader(),
    }
  );
  return response.data;
};
