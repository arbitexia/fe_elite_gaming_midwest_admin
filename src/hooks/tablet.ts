import { useEffect } from 'react';
import { useAppToast } from '@/providers';
import {
  getTablets,
  createTablet,
  updateTablet,
  deleteTablet,
  tabletSelector,
  resetTabletMessage,
  changePasswordTablet,
} from '@/redux/slices';
import { TabletType } from '@/types';
import { useAppSelector, useAppDispatch } from './redux';

export const useTablet = () => {
  const appToast = useAppToast();
  const { tablets, pageInfo, loading, message, error } =
    useAppSelector(tabletSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loading) return;
    if (message) appToast({ severity: 'success', message: message });
    if (error) appToast({ severity: 'error', message: error });
    dispatch(resetTabletMessage(null));
  }, [loading]);

  const onGetTablets = async (param: TabletType.Param) => {
    await dispatch(getTablets(param));
  };

  const onCreateTablet = async (param: TabletType.Input) => {
    await dispatch(createTablet(param));
  };

  const onUpdateTablet = async (param: TabletType.Input) => {
    await dispatch(updateTablet(param));
  };

  const onDeleteTablet = async (id: number) => {
    await dispatch(deleteTablet({ id }));
  };

  const onChangePasswordTablet = async (
    param: TabletType.ChangePasswordParam
  ) => {
    await dispatch(changePasswordTablet(param));
  };

  return {
    tablets,
    pageInfo,
    onGetTablets,
    onCreateTablet,
    onUpdateTablet,
    onDeleteTablet,
    onChangePasswordTablet,
  };
};
