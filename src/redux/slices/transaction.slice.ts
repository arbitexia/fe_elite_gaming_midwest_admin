import { AxiosError } from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseStatus } from '@/constants';
import { transactionApi } from '@/redux/apis';
import { RootState, AppDispatch } from '@/redux/store';
import { ReduxJson, CommonType, TransactionType } from '@/types';

// Initial state
const initialState: ReduxJson.TransactionState = {
  loading: true,
  status: null,
  message: null,
  error: null,
  transactions: [],
  pageInfo: null,
};

export const getTransactions = createAsyncThunk<
  CommonType.Pagination<TransactionType.Data>,
  TransactionType.Filter,
  { dispatch: AppDispatch; state: RootState }
>(
  'Transactions/getTransactions',
  async (params: TransactionType.Filter, thunkAPI) => {
    try {
      return await transactionApi.getTransactions(params);
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

export const updateTransaction = createAsyncThunk<
  CommonType.Message,
  TransactionType.Param,
  { dispatch: AppDispatch; state: RootState }
>(
  'transaction/updateTransaction',
  async (params: TransactionType.Param, thunkAPI) => {
    try {
      return await transactionApi.updateTransaction(params);
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

export const deleteTransaction = createAsyncThunk<
  CommonType.Message,
  { id: number },
  { dispatch: AppDispatch; state: RootState }
>('transaction/deleteTransaction', async (params: { id: number }, thunkAPI) => {
  try {
    return await transactionApi.deleteTransaction(params);
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

// Actual Slice
export const transactionSlice = createSlice({
  name: 'Transaction',
  initialState,
  reducers: {
    resetTransactionMessage: (state: ReduxJson.TransactionState, _payload) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(
        getTransactions.fulfilled,
        (
          state,
          {
            payload,
          }: PayloadAction<CommonType.Pagination<TransactionType.Data>>
        ) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
          state.transactions = payload.data;
          state.pageInfo = payload.pageInfo;
        }
      )
      .addCase(getTransactions.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      })
      .addCase(updateTransaction.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(
        updateTransaction.fulfilled,
        (state, { payload }: PayloadAction<CommonType.Message>) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
          state.message = payload.message;
        }
      )
      .addCase(updateTransaction.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      })
      .addCase(deleteTransaction.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(
        deleteTransaction.fulfilled,
        (state, { payload }: PayloadAction<CommonType.Message>) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
          state.message = payload.message;
        }
      )
      .addCase(deleteTransaction.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      });
  },
});

export const { resetTransactionMessage } = transactionSlice.actions;

export const transactionSelector = (state: RootState) => state.transaction;

export default transactionSlice.reducer;
