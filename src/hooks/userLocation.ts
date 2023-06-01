import { useEffect } from 'react';
import { useAppToast } from '@/providers';
import {
  getUsersByLocationId,
  resetUserMessage,
  userLocationSelector,
} from '@/redux/slices';
import { UserLocationFilter } from '@/types';
import { useAppSelector, useAppDispatch } from './redux';

export const useUserLocation = () => {
  const appToast = useAppToast();
  const { userLocations, pageInfo, loading, message, error } =
    useAppSelector(userLocationSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loading) return;
    if (message) appToast({ severity: 'success', message: message });
    if (error) appToast({ severity: 'error', message: error });
    dispatch(resetUserMessage(null));
  }, [loading]);

  const onGetUserLocationById = async (param: UserLocationFilter) => {
    await dispatch(getUsersByLocationId(param));
  };

  return {
    userLocations,
    pageInfo,
    onGetUserLocationById,
  };
};
