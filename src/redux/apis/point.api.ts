/**
 * Copyright (c) 2023, Red Vector, Inc.
 * All rights reserved
 */

/**
 * Author: Daniel Pit
 */
import { GetPointParam } from '@/types';
import { jwtAxios } from './axios.api';
import { getAuthorizeHeader } from '@/libs/data-helper';

export const getPoints = async (params: GetPointParam) => {
  const response = await jwtAxios.get(`/points`, {
    params,
    headers: getAuthorizeHeader(),
  });
  return response.data;
};
