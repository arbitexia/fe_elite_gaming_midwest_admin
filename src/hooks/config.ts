import { useEffect } from 'react';
import { useAppToast } from '@/providers';
import {
  getConfig,
  createConfig,
  resetConfigMessage,
  configSelector,
} from '@/redux/slices';
import { useAppSelector, useAppDispatch } from './redux';
import { ConfigInputType, ConfigType, GetConfigParam } from '@/types';
import { PayloadAction } from '@reduxjs/toolkit';

export const useConfig = () => {
  const appToast = useAppToast();
  const { configItem, loading, message, error } =
    useAppSelector(configSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loading) return;
    if (message) appToast({ severity: 'success', message: message });
    if (error) appToast({ severity: 'error', message: error });
    dispatch(resetConfigMessage(null));
  }, [loading]);

  const onGetConfig = async (param: GetConfigParam) => {
    await dispatch(getConfig(param));
  };

  const onCreateConfig = async (
    param: ConfigInputType
  ): Promise<ConfigType> => {
    const { payload }: PayloadAction<unknown> = await dispatch(
      createConfig(param)
    );
    return payload as ConfigType;
  };

  return {
    configItem,
    onGetConfig,
    onCreateConfig,
  };
};
