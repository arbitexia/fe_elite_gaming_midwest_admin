import { AxiosError } from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseStatus } from '@/constants';
import { rewardApi } from '@/redux/apis';
import { RootState, AppDispatch } from '@/redux/store';
import { CommonType, CreateRewardParam, Product, ReduxJson } from '@/types';

const initialState: ReduxJson.RewardState = {
  loading: true,
  status: null,
  message: null,
  error: null,
  locationId: 0,
  products: [],
};

export const createReward = createAsyncThunk<
  CommonType.Message & { locationId: number; products: Product[] },
  CreateRewardParam,
  { dispatch: AppDispatch; state: RootState }
>('reward/createReward', async (params: CreateRewardParam, thunkAPI) => {
  try {
    return await rewardApi.createReward(params);
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

export const getProductsByLocationId = createAsyncThunk<
  Product[],
  number,
  { dispatch: AppDispatch; state: RootState }
>('reward/getProductsByLocationId', async (id: number, thunkAPI) => {
  try {
    return await rewardApi.getProductsByLocationId(id);
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
      .addCase(createReward.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(createReward.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      })
      .addCase(
        createReward.fulfilled,
        (
          state,
          {
            payload,
          }: PayloadAction<
            CommonType.Message & { locationId: number; products: Product[] }
          >
        ) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
          state.message = payload.message;
          state.locationId = payload.locationId;
          state.products = payload.products;
        }
      )
      .addCase(getProductsByLocationId.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(getProductsByLocationId.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      })
      .addCase(
        getProductsByLocationId.fulfilled,
        (state, { payload }: PayloadAction<Product[]>) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
          state.products = payload;
        }
      );
  },
});

export const { resetRewardMessage } = rewardSlice.actions;

export const rewardSelector = (state: RootState) => state.reward;
export default rewardSlice.reducer;
