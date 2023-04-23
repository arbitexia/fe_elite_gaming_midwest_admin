import { AxiosError } from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseStatus } from '@/constants';
import { emailTemplateApi } from '@/redux/apis';
import { RootState, AppDispatch } from '@/redux/store';
import { ReduxJson, EmailTemplateType, CommonType } from '@/types';

// Initial state
const initialState: ReduxJson.EmailTemplateState = {
  loading: true,
  status: null,
  message: null,
  error: null,
  emailTemplates: [],
  pageInfo: null,
};

export const getEmailTemplates = createAsyncThunk<
  CommonType.Pagination<EmailTemplateType.Data>,
  EmailTemplateType.Filter,
  { dispatch: AppDispatch; state: RootState }
>(
  'emailTemplate/getEmailTemplates',
  async (params: EmailTemplateType.Filter, thunkAPI) => {
    try {
      return await emailTemplateApi.getEmailTemplates(params);
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

export const getEmailTemplateById = createAsyncThunk<
  EmailTemplateType.Data,
  number,
  { dispatch: AppDispatch; state: RootState }
>('emailTemplate/getEmailTemplateById', async (params: number, thunkAPI) => {
  try {
    return await emailTemplateApi.getEmailTemplateById(params);
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

export const createEmailTemplate = createAsyncThunk<
  EmailTemplateType.Data,
  EmailTemplateType.Body,
  { dispatch: AppDispatch; state: RootState }
>(
  'emailTemplate/createEmailTemplate',
  async (body: EmailTemplateType.Body, thunkAPI) => {
    try {
      return await emailTemplateApi.createEmailTemplate(body);
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

export const deleteEmailTemplate = createAsyncThunk<
  CommonType.Message,
  number,
  { dispatch: AppDispatch; state: RootState }
>('emailTemplate/deleteEmailTemplate', async (param: number, thunkAPI) => {
  try {
    return await emailTemplateApi.deleteEmailTemplate(param);
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

export const sendTestEmail = createAsyncThunk<
  CommonType.Message,
  EmailTemplateType.SendEmail,
  { dispatch: AppDispatch; state: RootState }
>(
  'emailTemplate/sendTestEmail',
  async (body: EmailTemplateType.SendEmail, thunkAPI) => {
    try {
      return await emailTemplateApi.sendTestEmail(body);
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

// Actual Slice
export const emailTemplateSlice = createSlice({
  name: 'EmailTemplate',
  initialState,
  reducers: {
    resetEmailTemplateMessage: (
      state: ReduxJson.EmailTemplateState,
      _payload
    ) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmailTemplates.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(
        getEmailTemplates.fulfilled,
        (
          state,
          {
            payload,
          }: PayloadAction<CommonType.Pagination<EmailTemplateType.Data>>
        ) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
          state.emailTemplates = payload.data;
          state.pageInfo = payload.pageInfo;
        }
      )
      .addCase(getEmailTemplates.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      })
      .addCase(getEmailTemplateById.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(getEmailTemplateById.fulfilled, (state) => {
        state.loading = false;
        state.status = ResponseStatus.SUCCESS;
      })
      .addCase(getEmailTemplateById.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      })
      .addCase(createEmailTemplate.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(createEmailTemplate.fulfilled, (state) => {
        state.loading = false;
        state.status = ResponseStatus.SUCCESS;
      })
      .addCase(createEmailTemplate.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      })
      .addCase(deleteEmailTemplate.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(
        deleteEmailTemplate.fulfilled,
        (state, { payload }: PayloadAction<CommonType.Message>) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
          state.message = payload.message;
        }
      )
      .addCase(deleteEmailTemplate.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      })
      .addCase(sendTestEmail.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(
        sendTestEmail.fulfilled,
        (state, { payload }: PayloadAction<CommonType.Message>) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
          state.message = payload.message;
        }
      )
      .addCase(sendTestEmail.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      });
  },
});

export const { resetEmailTemplateMessage } = emailTemplateSlice.actions;

export const emailTemplateSelector = (state: RootState) => state.emailTemplate;

export default emailTemplateSlice.reducer;
