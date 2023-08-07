import {
  GetUsersParam,
  GetUserParam,
  UpdateUserParam,
  DeleteUserParam,
  UserType,
  UserLocationFilter,
  UserSMSParam,
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

export const getUsersByLocationId = async (params: UserLocationFilter) => {
  const response = await jwtAxios.get(`/user_locations`, {
    headers: getAuthorizeHeader(),
    params,
  });
  return response.data;
};

export const sendSMSToUser = async (params: UserSMSParam) => {
  const response = await jwtAxios.post(`/sms/user`, params, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};
