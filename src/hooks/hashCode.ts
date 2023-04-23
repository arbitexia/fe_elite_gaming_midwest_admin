import { useEffect } from 'react';
import { useAppToast } from '@/providers';
import {
  getHashCodes,
  resetHashCodeMessage,
  hashCodeSelector,
} from '@/redux/slices';
import { useAppSelector, useAppDispatch } from './redux';
import { EmailTemplateStatusEnum } from '@/constants';

export const useHashCode = () => {
  const appToast = useAppToast();
  const { hashCodes, loading, message, error } =
    useAppSelector(hashCodeSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loading) return;
    if (message) appToast({ severity: 'success', message: message });
    if (error) appToast({ severity: 'error', message: error });
    dispatch(resetHashCodeMessage(null));
  }, [loading]);

  const onGetHashCodes = async () => {
    await dispatch(getHashCodes(EmailTemplateStatusEnum.PUBLISHED));
  };

  return {
    hashCodes,
    onGetHashCodes,
  };
};
