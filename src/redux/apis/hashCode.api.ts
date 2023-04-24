/**
 * Copyright (c) 2023, Red Vector, Inc.
 * All rights reserved
 */

/**
 * Author: Daniel Pit
 */
import { jwtAxios } from './axios.api';
import { getAuthorizeHeader } from '@/libs/data-helper';

export const getHashCodes = async () => {
  const response = await jwtAxios.get(`/hashCodes`, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};
