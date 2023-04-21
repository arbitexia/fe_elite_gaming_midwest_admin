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
  UserType,
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
  const response = await jwtAxios.get(`/users/${params.userId}`, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const updateUser = async (params: UpdateUserParam) => {
  const response = await jwtAxios.put(`/users`, params, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const deleteUser = async (params: DeleteUserParam) => {
  const response = await jwtAxios.delete(`/users/${params.userId}`, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const changePasswordUser = async (
  params: UserType.ChangePasswordParam
) => {
  const response = await jwtAxios.post(`/password`, params, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};
