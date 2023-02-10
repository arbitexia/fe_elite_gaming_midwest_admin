import { useAppToast } from '@/providers';
import {
  getUser,
  changePassword,
  getUsers,
  deleteUser,
  updateUser,
  usersSelector,
  resetUserMessage,
} from '@/redux/slices';

import {
  ChangePasswordParam,
  GetUsersParam,
  UpdateUserParam,
  UserType,
} from '@/types';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './redux';

export const useUser = () => {
  const appToast = useAppToast();
  const { users, pageInfo, currentUser, currentId, loading, message, error } =
    useAppSelector(usersSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loading) return;
    if (message) appToast({ severity: 'success', message: message });
    if (error) appToast({ severity: 'error', message: error });
    dispatch(resetUserMessage(null));
  }, [loading]);

  const onGetUserById = (id: number) => {
    return users.find((user: UserType.User) => user.id === id);
  };

  const onUserSelect = async (id: number) => {
    await dispatch(getUser({ userId: id }));
  };

  const onGetUsers = async (param: GetUsersParam) => {
    await dispatch(getUsers(param));
  };

  const onUpdateUser = async (param: UpdateUserParam) => {
    await dispatch(updateUser(param));
  };

  const onDeleteUser = async (id: number) => {
    await dispatch(deleteUser({ userId: id }));
  };

  const onChangePassword = async (param: ChangePasswordParam) => {
    await dispatch(changePassword(param));
  };

  return {
    loading,
    users,
    currentUser,
    pageInfo,
    currentId,
    onGetUserById,
    onUserSelect,
    onGetUsers,
    onChangePassword,
    onUpdateUser,
    onDeleteUser,
  };
};
