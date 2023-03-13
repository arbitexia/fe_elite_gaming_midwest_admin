import { jwtAxios } from './axios.api';
import { getAuthorizeHeader } from '@/libs/data-helper';
import { Location } from '@/types';

export const getLocations = async (params: Location.Filter) => {
  const response = await jwtAxios.get(`/locations`, {
    params,
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const getLocation = async (params: Location.Param) => {
  const response = await jwtAxios.get(`/locations/${params.id}`, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const createLocation = async (params: Location.Body) => {
  const response = await jwtAxios.post(`/locations`, params, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const updateLocation = async (param: Location.Param & Location.Body) => {
  const response = await jwtAxios.put(`/locations/${param.id}`, param, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const deleteLocation = async (param: Location.Param) => {
  const response = await jwtAxios.delete(`/locations/${param.id}`, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};
