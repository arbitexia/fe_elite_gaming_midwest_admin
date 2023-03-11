import { AxiosError } from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseStatus } from '@/constants';
import { userApi } from '@/redux/apis';
import { RootState, AppDispatch } from '@/redux/store';
import {
  ReduxJson,
  GetUserParam,
  GetUsersParam,
  ChangePasswordParam,
  UpdateUserParam,
  DeleteUserParam,
  UserType,
  CommonType,
} from '@/types';

// Initial state
const initialState: ReduxJson.UserState = {
  loading: true,
  status: null,
  users: [],
  pageInfo: null,
  currentId: 0,
  currentUser: null,
  message: null,
  error: null,
};

export const getUsers = createAsyncThunk<
  CommonType.Pagination<UserType.User>,
  GetUsersParam,
  { dispatch: AppDispatch; state: RootState }
>('user/getUsers', async (params: GetUsersParam, thunkAPI) => {
  try {
    return await userApi.getUsers(params);
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

export const getUser = createAsyncThunk<
  UserType.User,
  GetUserParam,
  { dispatch: AppDispatch; state: RootState }
>('user/getUser', async (params: GetUserParam, thunkAPI) => {
  try {
    return await userApi.getUser(params);
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

export const changePassword = createAsyncThunk<
  CommonType.Message,
  ChangePasswordParam,
  { dispatch: AppDispatch; state: RootState }
>('user/changePassword', async (params: ChangePasswordParam, thunkAPI) => {
  try {
    return await userApi.changePassword(params);
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

export const updateUser = createAsyncThunk<
  UserType.User,
  UpdateUserParam,
  { dispatch: AppDispatch; state: RootState }
>('user/updateUser', async (params: UpdateUserParam, thunkAPI) => {
  try {
    return await userApi.updateUser(params);
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

export const deleteUser = createAsyncThunk<
  CommonType.Message,
  DeleteUserParam,
  { dispatch: AppDispatch; state: RootState }
>('user/deleteUser', async (params: DeleteUserParam, thunkAPI) => {
  try {
    return await userApi.deleteUser(params);
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

// Actual Slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUserMessage: (state: ReduxJson.UserState, _payload) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(
        getUsers.fulfilled,
        (
          state,
          { payload }: PayloadAction<CommonType.Pagination<UserType.User>>
        ) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
          state.pageInfo = payload.pageInfo;
          state.users = payload.data;
        }
      )
      .addCase(getUsers.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(
        getUser.fulfilled,
        (state, { payload }: PayloadAction<UserType.User>) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
          state.currentUser = payload;
          state.currentId = payload.id;
        }
      )
      .addCase(getUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(
        changePassword.fulfilled,
        (state, { payload }: PayloadAction<CommonType.Message>) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
          state.message = payload.message;
        }
      )
      .addCase(changePassword.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(
        updateUser.fulfilled,
        (state, { payload }: PayloadAction<UserType.User>) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
          state.currentUser = payload;
          state.currentId = payload.id;
        }
      )
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(
        deleteUser.fulfilled,
        (state, { payload }: PayloadAction<CommonType.Message>) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
          state.message = payload.message;
        }
      )
      .addCase(deleteUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      });
  },
});

export const { resetUserMessage } = userSlice.actions;

export const usersSelector = (state: RootState) => state.user;

export default userSlice.reducer;
