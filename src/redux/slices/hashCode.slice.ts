import { AxiosError } from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseStatus } from '@/constants';
import { hashCodeApi } from '@/redux/apis';
import { RootState, AppDispatch } from '@/redux/store';
import { ReduxJson, HashCodeType } from '@/types';

// Initial state
// const initHashCodeData: HashCodeType.Data = {
//   id: 0,
//   name: '',
//   model: '',
//   field: '',
//   description: '',
//   status: '',
//   createdAt: '',
// };

const initialState: ReduxJson.HashCodeState = {
  loading: true,
  status: null,
  hashCodes: [],
  message: null,
  error: null,
};

export const getHashCodes = createAsyncThunk<
  HashCodeType.Data[],
  string,
  { dispatch: AppDispatch; state: RootState }
>('hashCodes', async (param: string, thunkAPI) => {
  try {
    return await hashCodeApi.getHashCodes();
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

// Actual Slice
export const hashCodeSlice = createSlice({
  name: 'hashCode',
  initialState,
  reducers: {
    resetHashCodeMessage: (state: ReduxJson.HashCodeState, _payload) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHashCodes.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(
        getHashCodes.fulfilled,
        (state, { payload }: PayloadAction<HashCodeType.Data[]>) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
          state.hashCodes = payload;
        }
      )
      .addCase(getHashCodes.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      });
  },
});

export const { resetHashCodeMessage } = hashCodeSlice.actions;

export const hashCodeSelector = (state: RootState) => state.hashCode;

export default hashCodeSlice.reducer;
