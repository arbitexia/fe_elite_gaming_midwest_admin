import { AxiosError } from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseStatus } from '@/constants';
import { rewardApi } from '@/redux/apis';
import { RootState, AppDispatch } from '@/redux/store';
import { ReduxJson, Reward } from '@/types';

const initialState: ReduxJson.RewardState = {
  loading: true,
  status: null,
  message: null,
  error: null,
  rewards: [],
};

export const filterRewards = createAsyncThunk<
  Reward.Data[],
  Reward.Filter,
  { dispatch: AppDispatch; state: RootState }
>('rewards/filterRewards', async (filter: Reward.Filter, thunkAPI) => {
  try {
    return await rewardApi.filter(filter);
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

export const createRewards = createAsyncThunk<
  Reward.Data[],
  Reward.Body,
  { dispatch: AppDispatch; state: RootState }
>('rewards/createRewards', async (body: Reward.Body, thunkAPI) => {
  try {
    return await rewardApi.create(body);
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

export const rewardSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    resetRewardMessage: (state: ReduxJson.RewardState, _payload) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(filterRewards.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(filterRewards.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      })
      .addCase(
        filterRewards.fulfilled,
        (state, { payload }: PayloadAction<Reward.Data[]>) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
          state.rewards = payload;
        }
      )
      .addCase(createRewards.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(createRewards.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      })
      .addCase(
        createRewards.fulfilled,
        (state, { payload }: PayloadAction<Reward.Data[]>) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
          state.rewards = payload;
        }
      );
  },
});

export const { resetRewardMessage } = rewardSlice.actions;

export const rewardSelector = (state: RootState) => state.reward;
export default rewardSlice.reducer;
