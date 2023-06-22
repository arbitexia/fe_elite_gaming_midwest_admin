import { AxiosError } from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseStatus } from '@/constants';
import { configApi } from '@/redux/apis';
import { RootState, AppDispatch } from '@/redux/store';
import {
  ReduxJson,
  ConfigType,
  ConfigInputType,
  GetConfigParam,
} from '@/types';

// Initial state
const initConfigData: ConfigType = {
  id: 0,
  daily: 50,
  weekly: 50,
  monthly: 50,
  checkinThreshold: 0,
  coupon: 0,
  initialCoupon: 10000,
};
const initialState: ReduxJson.ConfigState = {
  loading: true,
  status: null,
  configItem: null,
  message: null,
  error: null,
};

export const getConfig = createAsyncThunk<
  ConfigType,
  GetConfigParam,
  { dispatch: AppDispatch; state: RootState }
>('config', async (params: GetConfigParam, thunkAPI) => {
  try {
    return await configApi.getConfig();
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

export const createConfig = createAsyncThunk<
  ConfigType,
  ConfigInputType,
  { dispatch: AppDispatch; state: RootState }
>('config/createConfig', async (params: ConfigInputType, thunkAPI) => {
  try {
    return await configApi.createConfig(params);
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

// Actual Slice
export const configSlice = createSlice({
  name: 'point',
  initialState,
  reducers: {
    resetConfigMessage: (state: ReduxJson.ConfigState, _payload) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConfig.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(
        getConfig.fulfilled,
        (state, { payload }: PayloadAction<ConfigType>) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
          state.configItem = payload ?? initConfigData;
        }
      )
      .addCase(getConfig.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      })
      .addCase(createConfig.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(
        createConfig.fulfilled,
        (state, { payload }: PayloadAction<ConfigType>) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
          state.configItem = payload;
        }
      )
      .addCase(createConfig.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      });
  },
});

export const { resetConfigMessage } = configSlice.actions;

export const configSelector = (state: RootState) => state.config;

export default configSlice.reducer;
