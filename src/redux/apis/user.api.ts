/**
 * Copyright (c) 2022, Red Vector, Inc.
 * All rights reserved
 */

/**
 * Author: Dan Finkel
 */
import {
  GetUsersParam,
  GetUserParam,
  UpdateUserParam,
  DeleteUserParam,
  ChangePasswordParam,
} from '@/types';
import { jwtAxios } from './axios.api';
import { getAuthorizeHeader } from '@/libs/data-helper';

export const getUsers = async (params: GetUsersParam) => {
  const response = await jwtAxios.get(`/users`, {
    headers: getAuthorizeHeader(),
    params,
  });
  return response.data;
};

export const getUser = async (params: GetUserParam) => {
  const response = await jwtAxios.get(`/user/${params.userId}`, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const changePassword = async (params: ChangePasswordParam) => {
  const response = await jwtAxios.post(`/password`, params, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const updateUser = async (params: UpdateUserParam) => {
  const response = await jwtAxios.put(`/user}`, params, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const deleteUser = async (params: DeleteUserParam) => {
  const response = await jwtAxios.delete(`/user/${params.userId}`, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};
