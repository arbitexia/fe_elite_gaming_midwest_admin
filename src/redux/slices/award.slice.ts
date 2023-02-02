import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { awardApi } from '@/redux/apis';
import { AxiosError } from 'axios';
import { RootState, AppDispatch } from '@/redux/store';
import {
  ReduxJson,
  GetAwardsParam,
  ResponseStatus,
  AwardType,
  CreateAwardParam,
  CommonType,
} from '@/types';

// Initial state
const initialState: ReduxJson.AwardState = {
  loading: true,
  status: null,
  awards: [],
  pageInfo: null,
  message: null,
  error: null,
};

export const getAwards = createAsyncThunk<
  AwardType[],
  GetAwardsParam,
  { dispatch: AppDispatch; state: RootState }
>('Award/getAwards', async (params: GetAwardsParam, thunkAPI) => {
  try {
    return await awardApi.getAwards(params);
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

export const getAward = createAsyncThunk<
  AwardType,
  number,
  { dispatch: AppDispatch; state: RootState }
>('award/getAward', async (params: number, thunkAPI) => {
  try {
    return await awardApi.getAward(params);
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

export const createAward = createAsyncThunk<
  AwardType,
  CreateAwardParam,
  { dispatch: AppDispatch; state: RootState }
>('award/createAward', async (params: CreateAwardParam, thunkAPI) => {
  try {
    return await awardApi.createAward(params);
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

export const acceptAward = createAsyncThunk<
  CommonType.Message,
  number,
  { dispatch: AppDispatch; state: RootState }
>('award/acceptAward', async (params: number, thunkAPI) => {
  try {
    return await awardApi.acceptAward(params);
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

export const declineAward = createAsyncThunk<
  CommonType.Message,
  number,
  { dispatch: AppDispatch; state: RootState }
>('award/declineAward', async (params: number, thunkAPI) => {
  try {
    return await awardApi.declineAward(params);
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

// Actual Slice
export const AwardSlice = createSlice({
  name: 'Award',
  initialState,
  reducers: {
    resetAwardMessage: (state: ReduxJson.AwardState, _payload) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAwards.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(
        getAwards.fulfilled,
        (state, { payload }: PayloadAction<AwardType[]>) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
          state.awards = payload;
        }
      )
      .addCase(getAwards.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      })
      .addCase(getAward.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(
        getAward.fulfilled,
        (state, { payload }: PayloadAction<AwardType>) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
          console.log(payload);
        }
      )
      .addCase(getAward.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      })
      .addCase(createAward.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(
        createAward.fulfilled,
        (state, { payload }: PayloadAction<AwardType>) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
          console.log(payload);
        }
      )
      .addCase(createAward.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      })
      .addCase(acceptAward.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(
        acceptAward.fulfilled,
        (state, { payload }: PayloadAction<CommonType.Message>) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
          state.message = payload.message;
        }
      )
      .addCase(acceptAward.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      })
      .addCase(declineAward.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(
        declineAward.fulfilled,
        (state, { payload }: PayloadAction<CommonType.Message>) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
          state.message = payload.message;
        }
      )
      .addCase(declineAward.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      });
  },
});

export const { resetAwardMessage } = AwardSlice.actions;

export const awardSelector = (state: RootState) => state.award;

export default AwardSlice.reducer;
