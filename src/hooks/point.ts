import { useAppToast } from '@/providers';
import { getPoints, resetPointMessage, pointSelector } from '@/redux/slices';

import { GetPointParam } from '@/types';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './redux';

export const usePoint = () => {
  const appToast = useAppToast();
  const { points, loading, message, error } = useAppSelector(pointSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loading) return;
    if (message) appToast({ severity: 'success', message: message });
    if (error) appToast({ severity: 'error', message: error });
    dispatch(resetPointMessage(null));
  }, [loading]);

  const onGetPoints = async (param: GetPointParam) => {
    await dispatch(getPoints(param));
  };

  return {
    points,
    onGetPoints,
  };
};
