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

// export const createActivity = async (params: Product.Body) => {
//   const response = await jwtAxios.post(`/products`, params, {
//     headers: getAuthorizeHeader(),
//   });
//   return response.data;
// };

// export const updateActivity = async (params: Product.Param & Product.Body) => {
//   const response = await jwtAxios.put(`/products/${params.id}`, params, {
//     headers: getAuthorizeHeader(),
//   });
//   return response.data;
// };
