/**
 * Copyright (c) 2023, Red Vector, Inc.
 * All rights reserved
 */

/**
 * Author: Daniel Pit
 */
import { jwtAxios } from './axios.api';
import { getAuthorizeHeader } from '@/libs/data-helper';
import { ConfigInputType } from '@/types';

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
