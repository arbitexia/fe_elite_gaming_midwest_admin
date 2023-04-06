import { useEffect } from 'react';
import { PayloadAction } from '@reduxjs/toolkit';
import { useAppToast } from '@/providers';
import {
  rewardSelector,
  filterRewards,
  createRewards,
  getRewardsByUserId,
  resetRewardMessage,
} from '@/redux/slices';
import { Reward } from '@/types';
import { useAppSelector, useAppDispatch } from './redux';

export const useReward = () => {
  const appToast = useAppToast();
  const { loading, message, error, rewards, pageInfo, availableRewards } =
    useAppSelector(rewardSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loading) return;
    if (message) appToast({ severity: 'success', message: message });
    if (error) appToast({ severity: 'error', message: error });
    dispatch(resetRewardMessage(null));
  }, [loading]);

  const onFilterRewards = async (
    filter: Reward.Filter
  ): Promise<Reward.DataList> => {
    const { payload } = (await dispatch(
      filterRewards(filter)
    )) as PayloadAction<Reward.DataList>;

    return payload;
  };

  const onRewardsByUserId = async (data: {
    userId: number;
  }): Promise<Reward.Data[]> => {
    const { payload } = (await dispatch(
      getRewardsByUserId(data)
    )) as PayloadAction<Reward.Data[]>;

    return payload;
  };

  const onCreateRewards = async (body: Reward.Body): Promise<Reward.Data[]> => {
    const { payload } = (await dispatch(createRewards(body))) as PayloadAction<
      Reward.Data[]
    >;
    return payload;
  };

  return {
    pageInfo,
    rewards,
    availableRewards,
    onFilterRewards,
    onCreateRewards,
    onRewardsByUserId,
  };
};
