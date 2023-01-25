/**
 * Copyright (c) 2022, Red Vector, Inc.
 * All rights reserved
 */

/**
 * Author: Daniel Pit
 */
import { jwtAxios } from './axios.api';
import { getAuthorizeHeader } from '@/libs/data-helper';
import {
  GetLocationsParam,
  GetLocationParam,
  CreateLocationParam,
  UpdateLocationParam,
  DeleteLocationParam,
} from '@/types';

export const getLocations = async (params: GetLocationsParam) => {
  const response = await jwtAxios.get(`/locations`, {
    params,
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const getLocation = async (params: GetLocationParam) => {
  const response = await jwtAxios.get(`/location/${params.locationId}`, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const createLocation = async (params: CreateLocationParam) => {
  const response = await jwtAxios.post(`/location`, params, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const updateLocation = async (params: UpdateLocationParam) => {
  const response = await jwtAxios.put(`/location/${params.id}`, params, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const deleteLocation = async (params: DeleteLocationParam) => {
  const response = await jwtAxios.delete(`/location/${params.locationId}`, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};
