import { AxiosError } from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseStatus } from '@/constants';
import { activityApi } from '@/redux/apis';
import { RootState, AppDispatch } from '@/redux/store';
import {
  ActivityFilterType,
  ActivityItemType,
  CommonType,
  ReduxJson,
} from '@/types';

const initialState: ReduxJson.ActivityState = {
  loading: true,
  status: null,
  message: null,
  error: null,
  activities: [],
  pageInfo: null,
};

export const filterActivities = createAsyncThunk<
  CommonType.Pagination<ActivityItemType>,
  ActivityFilterType,
  { dispatch: AppDispatch; state: RootState }
>('activity/filterActivities', async (filter: ActivityFilterType, thunkAPI) => {
  try {
    return await activityApi.getActivities(filter);
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

export const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    resetActivityMessage: (state: ReduxJson.ActivityState, _payload) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(filterActivities.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(filterActivities.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      })
      .addCase(
        filterActivities.fulfilled,
        (
          state,
          { payload }: PayloadAction<CommonType.Pagination<ActivityItemType>>
        ) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
          state.activities = payload.data;
          state.pageInfo = payload.pageInfo;
        }
      );
  },
});

export const { resetActivityMessage } = activitySlice.actions;

export const activitySelector = (state: RootState) => state.activity;
export default activitySlice.reducer;
