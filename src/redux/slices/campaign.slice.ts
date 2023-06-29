import { AxiosError } from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseStatus } from '@/constants';
import { campaignApi } from '@/redux/apis';
import { RootState, AppDispatch } from '@/redux/store';
import { ReduxJson, CampaignType } from '@/types';

// Initial state
const initialState: ReduxJson.CampaignState = {
  loading: true,
  status: null,
  campaigns: null,
  pageInfo: null,
  message: null,
  error: null,
};

export const getCampaigns = createAsyncThunk<
  CampaignType.Data[],
  CampaignType.Filter,
  { dispatch: AppDispatch; state: RootState }
>('campaign/getCampaigns', async (params: CampaignType.Filter, thunkAPI) => {
  try {
    return await campaignApi.getCampaigns(params);
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

export const saveCampaign = createAsyncThunk<
  CampaignType.Data,
  CampaignType.Body,
  { dispatch: AppDispatch; state: RootState }
>('campaign/saveCampaign', async (body: CampaignType.Body, thunkAPI) => {
  try {
    return await campaignApi.saveCampaign(body);
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

export const deleteCampaign = createAsyncThunk<
  string,
  CampaignType.Param,
  { dispatch: AppDispatch; state: RootState }
>('campaign/deleteCampaign', async (params: CampaignType.Param, thunkAPI) => {
  try {
    return await campaignApi.deleteCampaign(params);
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

// Actual Slice
export const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    resetCampaignMessage: (state: ReduxJson.CampaignState, _payload) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCampaigns.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(
        getCampaigns.fulfilled,
        (state, { payload }: PayloadAction<CampaignType.Data[]>) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
          state.campaigns = payload;
        }
      )
      .addCase(getCampaigns.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      })
      .addCase(saveCampaign.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(saveCampaign.fulfilled, (state) => {
        state.loading = false;
        state.status = ResponseStatus.SUCCESS;
        state.message = 'Campaign has been saved successfully.';
      })
      .addCase(saveCampaign.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      })
      .addCase(deleteCampaign.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(deleteCampaign.fulfilled, (state) => {
        state.loading = false;
        state.status = ResponseStatus.SUCCESS;
      })
      .addCase(deleteCampaign.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      });
  },
});

export const { resetCampaignMessage } = campaignSlice.actions;

export const campaignSelector = (state: RootState) => state.campaign;

export default campaignSlice.reducer;
