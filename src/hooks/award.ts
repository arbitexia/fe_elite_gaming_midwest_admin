import { useAppToast } from '@/providers';
import {
  getAward,
  getAwards,
  createAward,
  acceptAward,
  declineAward,
  resetAwardMessage,
  awardSelector,
} from '@/redux/slices';

import { GetAwardsParam, CreateAwardParam, AwardType } from '@/types';
import { PayloadAction } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './redux';

export const useAward = () => {
  const appToast = useAppToast();
  const { awards, pageInfo, loading, message, error } =
    useAppSelector(awardSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loading) return;
    if (message) appToast({ severity: 'success', message: message });
    if (error) appToast({ severity: 'error', message: error });
    dispatch(resetAwardMessage(null));
  }, [loading]);

  const onGetAwardById = (id: number) => {
    const award = awards.find((award: AwardType) => award.id === id);
    return award;
  };

  const onAwardSelect = async (id: number) => {
    await dispatch(getAward(id));
  };

  const onGetAwards = async (param: GetAwardsParam) => {
    await dispatch(getAwards(param));
  };

  const onCreateAward = async (param: CreateAwardParam): Promise<AwardType> => {
    const { payload }: PayloadAction<unknown> = await dispatch(
      createAward(param)
    );
    return payload as AwardType;
  };

  const onAcceptAward = async (id: number) => {
    await dispatch(acceptAward(id));
  };

  const onDeclineAward = async (id: number) => {
    await dispatch(declineAward(id));
  };

  return {
    awards,
    pageInfo,
    onGetAwardById,
    onAwardSelect,
    onGetAwards,
    onCreateAward,
    onAcceptAward,
    onDeclineAward,
  };
};
