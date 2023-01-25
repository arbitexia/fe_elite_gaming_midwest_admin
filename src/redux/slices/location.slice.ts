import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { locationApi } from '@/redux/apis';
import { AxiosError } from 'axios';
import { RootState, AppDispatch } from '@/redux/store';
import {
  ReduxJson,
  GetLocationsParam,
  GetLocationParam,
  ResponseStatus,
  LocationType,
  CreateLocationParam,
} from '@/types';

// Initial state
const initialState: ReduxJson.LocationState = {
  loading: true,
  status: null,
  locations: [],
  pageInfo: null,
  // currentId: 0,
  // currentLocation: null,
  message: null,
  error: null,
};

export const getLocations = createAsyncThunk<
  LocationType[],
  GetLocationsParam,
  { dispatch: AppDispatch; state: RootState }
>('location/getLocations', async (params: GetLocationsParam, thunkAPI) => {
  try {
    return await locationApi.getLocations(params);
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

export const getLocation = createAsyncThunk<
  LocationType,
  GetLocationParam,
  { dispatch: AppDispatch; state: RootState }
>('location/getLocation', async (params: GetLocationParam, thunkAPI) => {
  try {
    return await locationApi.getLocation(params);
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

export const createLocation = createAsyncThunk<
  LocationType,
  CreateLocationParam,
  { dispatch: AppDispatch; state: RootState }
>('location/createLocation', async (params: CreateLocationParam, thunkAPI) => {
  try {
    return await locationApi.createLocation(params);
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

// Actual Slice
export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    resetLocationMessage: (state: ReduxJson.LocationState, _payload) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLocations.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(
        getLocations.fulfilled,
        (state, { payload }: PayloadAction<LocationType[]>) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
          state.locations = payload;
        }
      )
      .addCase(getLocations.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      })
      .addCase(getLocation.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(
        getLocation.fulfilled,
        (state, { payload }: PayloadAction<LocationType>) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
          console.log(payload);
        }
      )
      .addCase(getLocation.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      })
      .addCase(createLocation.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(
        createLocation.fulfilled,
        (state, { payload }: PayloadAction<LocationType>) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
          console.log(payload);
        }
      )
      .addCase(createLocation.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      });
  },
});

export const { resetLocationMessage } = locationSlice.actions;

export const locationSelector = (state: RootState) => state.location;

export default locationSlice.reducer;
