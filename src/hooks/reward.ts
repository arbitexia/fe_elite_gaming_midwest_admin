import { useEffect } from 'react';
import { PayloadAction } from '@reduxjs/toolkit';
import { useAppToast } from '@/providers';
import {
  createReward,
  rewardSelector,
  resetRewardMessage,
  getProductsByLocationId,
} from '@/redux/slices';
import { CreateRewardParam } from '@/types';
import { useAppSelector, useAppDispatch } from './redux';

export const useReward = () => {
  const appToast = useAppToast();
  const { loading, message, error, locationId, products } =
    useAppSelector(rewardSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loading) return;
    if (message) appToast({ severity: 'success', message: message });
    if (error) appToast({ severity: 'error', message: error });
    dispatch(resetRewardMessage(null));
  }, [loading]);

  const onCreateReward = async (param: CreateRewardParam): Promise<unknown> => {
    const { payload }: PayloadAction<unknown> = await dispatch(
      createReward(param)
    );
    return payload;
  };

  const onGetProductsByLocationId = async (id: number): Promise<unknown> => {
    const { payload }: PayloadAction<unknown> = await dispatch(
      getProductsByLocationId(id)
    );
    return payload;
  };

  return { locationId, products, onCreateReward, onGetProductsByLocationId };
};
