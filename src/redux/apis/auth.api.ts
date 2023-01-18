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

const baseUrl: string = config.API_URL || '';

const headers = {
  'Access-Control-Allow-Origin': config.API_URL || '',
  'Access-Control-Allow-Methods': 'GET,POST',
};

export const refreshToken = async (params: RefreshTokenPrams) => {
  const response = await axios.post(`${baseUrl}/api/refreshToken`, params, {
    headers,
  });
  return response.data;
};

export const authorize = async (params: AdminAuthParams) => {
  const response = await axios.post(`${baseUrl}/api/authorize`, params, {
    headers,
  });
  return response.data;
};

export const forgotPassword = async (params: ForgotPasswordParams) => {
  const response = await axios.post(`${baseUrl}/api/forgotPassword`, params, {
    headers,
  });
  return response.data;
};

export const resetPassword = async (params: ResetPasswordParams) => {
  const response = await axios.post(`${baseUrl}/api/resetPassword`, params, {
    headers,
  });
  return response.data;
};
