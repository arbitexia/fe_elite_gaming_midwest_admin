import { useEffect } from 'react';
import { PayloadAction } from '@reduxjs/toolkit';
import { useAppToast } from '@/providers';
import {
  getTransactions,
  updateTransaction,
  deleteTransaction,
  resetTransactionMessage,
  transactionSelector,
} from '@/redux/slices';
import { TransactionType } from '@/types';
import { useAppSelector, useAppDispatch } from './redux';

export const useTransaction = () => {
  const appToast = useAppToast();
  const { transactions, pageInfo, loading, message, error } =
    useAppSelector(transactionSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loading) return;
    if (message) appToast({ severity: 'success', message: message });
    if (error) appToast({ severity: 'error', message: error });
    dispatch(resetTransactionMessage(null));
  }, [loading]);

  const onGetTransactions = async (param: TransactionType.Filter) => {
    await dispatch(getTransactions(param));
  };

  const onUpdateTransaction = async (param: TransactionType.Param) => {
    await dispatch(updateTransaction(param));
  };

  const onDeleteTransaction = async (params: { id: number }) => {
    await dispatch(deleteTransaction(params));
  };

  return {
    transactions,
    pageInfo,
    onGetTransactions,
    onUpdateTransaction,
    onDeleteTransaction,
  };
};
