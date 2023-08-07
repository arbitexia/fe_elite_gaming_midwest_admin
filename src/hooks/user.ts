import { useEffect } from 'react';
import { useAppToast } from '@/providers';
import {
  getUser,
  getUsers,
  deleteUser,
  updateUser,
  usersSelector,
  resetUserMessage,
  sendSMSToUser,
} from '@/redux/slices';
import {
  GetUsersParam,
  UpdateUserParam,
  UserSMSParam,
  UserType,
} from '@/types';
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

  const onSendSMSToUser = async (param: UserSMSParam) => {
    await dispatch(sendSMSToUser(param));
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
    onUpdateUser,
    onDeleteUser,
    onSendSMSToUser,
  };
};
