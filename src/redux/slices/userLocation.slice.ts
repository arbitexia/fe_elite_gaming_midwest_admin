import { AxiosError } from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseStatus } from '@/constants';
import { userApi } from '@/redux/apis';
import { RootState, AppDispatch } from '@/redux/store';
import {
  ReduxJson,
  CommonType,
  UserLocationsType,
  UserLocationFilter,
} from '@/types';

// Initial state
const initialState: ReduxJson.UserLocationState = {
  loading: true,
  status: null,
  userLocations: null,
  pageInfo: null,
  message: null,
  error: null,
};

export const getUsersByLocationId = createAsyncThunk<
  CommonType.Pagination<UserLocationsType>,
  UserLocationFilter,
  { dispatch: AppDispatch; state: RootState }
>(
  'userLocation/getUsersByLocationId',
  async (params: UserLocationFilter, thunkAPI) => {
    try {
      return await userApi.getUsersByLocationId(params);
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

// Actual Slice
export const userLocationSlice = createSlice({
  name: 'userLocation',
  initialState,
  reducers: {
    resetUserLocationMessage: (
      state: ReduxJson.UserLocationState,
      _payload
    ) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersByLocationId.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(
        getUsersByLocationId.fulfilled,
        (
          state,
          { payload }: PayloadAction<CommonType.Pagination<UserLocationsType>>
        ) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
          state.pageInfo = payload.pageInfo;
          state.userLocations = payload.data;
        }
      )
      .addCase(getUsersByLocationId.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      });
  },
});

export const { resetUserLocationMessage } = userLocationSlice.actions;

export const userLocationSelector = (state: RootState) => state.userLocation;

export default userLocationSlice.reducer;
