import { useEffect } from 'react';
import { useAppToast } from '@/providers';
import {
  getConfig,
  createConfig,
  saveBackOffice,
  resetConfigMessage,
  configSelector,
  getBackOffice,
} from '@/redux/slices';
import { useAppSelector, useAppDispatch } from './redux';
import {
  BackOfficeType,
  ConfigInputType,
  ConfigType,
  GetConfigParam,
} from '@/types';
import { PayloadAction } from '@reduxjs/toolkit';

export const useConfig = () => {
  const appToast = useAppToast();
  const { configItem, backOfficeItems, loading, message, error } =
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

  const onGetBackOffice = async () => {
    await dispatch(getBackOffice(''));
  };

  const onSaveConfig = async (param: ConfigInputType): Promise<ConfigType> => {
    const { payload }: PayloadAction<unknown> = await dispatch(
      createConfig(param)
    );
    return payload as ConfigType;
  };

  const onSaveBackOffice = async (
    param: BackOfficeType[]
  ): Promise<ConfigType> => {
    const { payload }: PayloadAction<unknown> = await dispatch(
      saveBackOffice(param)
    );
    return payload as ConfigType;
  };

  return {
    configItem,
    backOfficeItems,
    onGetConfig,
    onSaveConfig,
    onSaveBackOffice,
    onGetBackOffice,
  };
};
