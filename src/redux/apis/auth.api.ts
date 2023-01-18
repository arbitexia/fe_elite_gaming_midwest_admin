/**
 * Copyright (c) 2022, Red Vector, Inc.
 * All rights reserved
 */

/**
 * Author: Dan Finkel
 */
import {
  AdminAuthParams,
  ForgotPasswordParams,
  ResetPasswordParams,
  RefreshTokenPrams,
} from '@/types';
import axios from 'axios';
import config from '@/config';
import { getHeader } from '@/libs/data-helper';

const baseUrl: string = config.API_URL || '';
const headers = getHeader();

export const refreshToken = async (params: RefreshTokenPrams) => {
  const response = await axios.post(`${baseUrl}/api/refresh`, params, headers);
  return response.data;
};

export const authorize = async (params: AdminAuthParams) => {
  const response = await axios.post(
    `${baseUrl}/api/authorize`,
    params,
    headers
  );
  return response.data;
};

export const forgotPassword = async (params: ForgotPasswordParams) => {
  const response = await axios.post(
    `${baseUrl}/api/forgot_password`,
    params,
    headers
  );
  return response.data;
};

export const resetPassword = async (params: ResetPasswordParams) => {
  const response = await axios.post(
    `${baseUrl}/api/reset_password`,
    params,
    headers
  );
  return response.data;
};
