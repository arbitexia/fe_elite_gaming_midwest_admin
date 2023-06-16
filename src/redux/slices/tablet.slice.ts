import { AxiosError } from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseStatus } from '@/constants';
import { tabletApi } from '@/redux/apis';
import { RootState, AppDispatch } from '@/redux/store';
import { ReduxJson, TabletType, CommonType } from '@/types';

// Initial state
const initialState: ReduxJson.TabletState = {
  loading: true,
  status: null,
  tablets: [],
  pageInfo: null,
  message: null,
  error: null,
};

export const getTablets = createAsyncThunk<
  CommonType.Pagination<TabletType.Data>,
  TabletType.Param,
  { dispatch: AppDispatch; state: RootState }
>('tablet/getTablets', async (params: TabletType.Param, thunkAPI) => {
  try {
    return await tabletApi.getTablets(params);
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

export const createTablet = createAsyncThunk<
  TabletType.Data,
  TabletType.Input,
  { dispatch: AppDispatch; state: RootState }
>('tablet/createTablet', async (params: TabletType.Input, thunkAPI) => {
  try {
    return await tabletApi.createTablet(params);
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

export const updateTablet = createAsyncThunk<
  TabletType.Data,
  TabletType.Input,
  { dispatch: AppDispatch; state: RootState }
>('tablet/updateTablet', async (params: TabletType.Input, thunkAPI) => {
  try {
    return await tabletApi.updateTablet(params);
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

export const deleteTablet = createAsyncThunk<
  CommonType.Message,
  { id: number },
  { dispatch: AppDispatch; state: RootState }
>('tablet/deleteTablet', async (params: { id: number }, thunkAPI) => {
  try {
    return await tabletApi.deleteTablet(params);
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

export const changePasswordTablet = createAsyncThunk<
  CommonType.Message,
  TabletType.ChangePasswordParam,
  { dispatch: AppDispatch; state: RootState }
>(
  'tablet/changePassword',
  async (params: TabletType.ChangePasswordParam, thunkAPI) => {
    try {
      return await tabletApi.changePasswordTablet(params);
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

// Actual Slice
export const tabletSlice = createSlice({
  name: 'tablet',
  initialState,
  reducers: {
    resetTabletMessage: (state: ReduxJson.TabletState, _payload) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTablets.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(
        getTablets.fulfilled,
        (
          state,
          { payload }: PayloadAction<CommonType.Pagination<TabletType.Data>>
        ) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
          state.pageInfo = payload.pageInfo;
          state.tablets = payload.data;
        }
      )
      .addCase(getTablets.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      })
      .addCase(createTablet.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(
        createTablet.fulfilled,
        (state, { payload }: PayloadAction<TabletType.Data>) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
          state.tablets = [...state.tablets, payload];
        }
      )
      .addCase(createTablet.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      })
      .addCase(updateTablet.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(
        updateTablet.fulfilled,
        (state, { payload }: PayloadAction<TabletType.Data>) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
          state.tablets = state.tablets.map((t) => {
            if (t.id === payload.id) {
              return payload;
            } else {
              return t;
            }
          });
        }
      )
      .addCase(updateTablet.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      })
      .addCase(deleteTablet.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(
        deleteTablet.fulfilled,
        (state, { payload }: PayloadAction<CommonType.Message>) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
          state.message = payload.message;
          // state.tablets = state.tablets.filter((t) => t.id != payload.id);
        }
      )
      .addCase(deleteTablet.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      })
      .addCase(changePasswordTablet.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(
        changePasswordTablet.fulfilled,
        (state, { payload }: PayloadAction<CommonType.Message>) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
          state.message = payload.message;
        }
      )
      .addCase(changePasswordTablet.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      });
  },
});

export const { resetTabletMessage } = tabletSlice.actions;

export const tabletSelector = (state: RootState) => state.tablet;

export default tabletSlice.reducer;
