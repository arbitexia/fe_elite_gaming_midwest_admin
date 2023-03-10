import { AxiosError } from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseStatus } from '@/constants';
import { authApi } from '@/redux/apis';
import { RootState, AppDispatch } from '@/redux/store';
import {
  ReduxJson,
  AdminAuthParams,
  AdminAuthType,
  ForgotPasswordParams,
  ForgotPasswordType,
  RegisterType,
  ResetPasswordParams,
  ResetPasswordType,
} from '@/types';

// Initial state
const initialState: ReduxJson.AuthState = {
  loading: true,
  status: null,
  accessToken: '',
  refreshToken: '',
  message: '',
  error: null,
  user: null,
  role: {},
};

export const createNewUser = createAsyncThunk<
  RegisterType,
  RegisterType,
  { dispatch: AppDispatch; state: RootState }
>('auth/createNewUser', async (params: RegisterType, thunkAPI) => {
  try {
    return await authApi.createNewUser(params);
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

export const authorize = createAsyncThunk<
  AdminAuthType,
  AdminAuthParams,
  { dispatch: AppDispatch; state: RootState }
>('auth/authorize', async (params: AdminAuthParams, thunkAPI) => {
  try {
    return await authApi.authorize(params);
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

export const forgotPassword = createAsyncThunk<
  ForgotPasswordType,
  ForgotPasswordParams,
  { dispatch: AppDispatch; state: RootState }
>('auth/forgotPassword', async (params: ForgotPasswordParams, thunkAPI) => {
  try {
    return await authApi.forgotPassword(params);
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

export const resetPassword = createAsyncThunk<
  ResetPasswordType,
  ResetPasswordParams,
  { dispatch: AppDispatch; state: RootState }
>('auth/resetPassword', async (params: ResetPasswordParams, thunkAPI) => {
  try {
    return await authApi.resetPassword(params);
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

// Actual Slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthMessage: (
      state: ReduxJson.AuthState,
      _payload: PayloadAction<string>
    ) => {
      state.error = null;
      state.message = null;
    },
    refreshToken: (
      state: ReduxJson.AuthState,
      { payload }: PayloadAction<string>
    ) => {
      state.accessToken = payload;
      localStorage.setItem('accessToken', payload);
    },
    logout: (state: ReduxJson.AuthState) => {
      state.accessToken = '';
      state.refreshToken = '';
      state.user = null;
      state.role = {};
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authorize.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(
        authorize.fulfilled,
        (state, { payload }: PayloadAction<AdminAuthType>) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
          state.message = 'Login Success';
          state.user = payload.user;
          state.role = payload.role;
          state.accessToken = payload.accessToken;
          state.refreshToken = payload.refreshToken;
          localStorage.setItem('accessToken', payload.accessToken);
          localStorage.setItem('refreshToken', payload.refreshToken);
        }
      )
      .addCase(authorize.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
        state.accessToken = '';
      })
      .addCase(createNewUser.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(createNewUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      })
      .addCase(createNewUser.fulfilled, (state) => {
        state.loading = false;
        state.status = ResponseStatus.SUCCESS;
        state.message = 'Success';
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(
        resetPassword.fulfilled,
        (state, { payload }: PayloadAction<ResetPasswordType>) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
          state.message = payload.message;
        }
      )
      .addCase(resetPassword.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(
        forgotPassword.fulfilled,
        (state, { payload }: PayloadAction<ForgotPasswordType>) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
          state.message = payload.message;
        }
      )
      .addCase(forgotPassword.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      });
  },
});

export const { clearAuthMessage, logout, refreshToken } = authSlice.actions;

export const getReturnMessage = (state: RootState) => state.auth?.message;
export const getMe = (state: RootState) => state.auth?.user;
export const getRole = (state: RootState) => state.auth?.role;
export const authSelector = (state: RootState) => state.auth;

export default authSlice.reducer;
