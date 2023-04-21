import { useEffect } from 'react';
import { PayloadAction } from '@reduxjs/toolkit';
import { useAppToast } from '@/providers';
import {
  activitySelector,
  filterActivities,
  deleteActivity,
  resetActivityMessage,
} from '@/redux/slices';
import { ActivityFilterType, ActivityItemType } from '@/types';
import { useAppSelector, useAppDispatch } from './redux';

export const useActivity = () => {
  const appToast = useAppToast();
  const { loading, message, error, activities, pageInfo } =
    useAppSelector(activitySelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loading) return;
    if (message) appToast({ severity: 'success', message: message });
    if (error) appToast({ severity: 'error', message: error });
    dispatch(resetActivityMessage(null));
  }, [loading]);

  const onFilterActivities = async (
    filter: ActivityFilterType
  ): Promise<ActivityItemType> => {
    const { payload } = (await dispatch(
      filterActivities(filter)
    )) as PayloadAction<ActivityItemType>;

    return payload;
  };

  const onDeleteActivity = async (id: number) => {
    await dispatch(deleteActivity({ id }));
  };

  return { pageInfo, activities, onFilterActivities, onDeleteActivity };
};
