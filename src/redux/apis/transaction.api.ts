import { jwtAxios } from './axios.api';
import { getAuthorizeHeader } from '@/libs/data-helper';
import { TransactionType } from '@/types';

export const getTransactions = async (params: TransactionType.Filter) => {
  const response = await jwtAxios.get(`/transactions`, {
    params,
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const updateTransaction = async (params: TransactionType.Param) => {
  const response = await jwtAxios.put(
    `/transaction/${params.transactionId}`,
    params,
    {
      headers: getAuthorizeHeader(),
    }
  );
  return response.data;
};

export const deleteTransaction = async (params: { id: number }) => {
  const response = await jwtAxios.delete(`/transaction/${params.id}`, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};
