import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { assetApi } from '@/redux/apis';
import { AxiosError } from 'axios';
import { RootState, AppDispatch } from '@/redux/store';
import {
  AssetType,
  CommonType,
  CreateAssetParams,
  CreateGalleryParams,
  DeleteGalleryParams,
  ReduxJson,
  ResponseStatus,
} from '@/types';

// Initial state
const initialState: ReduxJson.AssetState = {
  loading: true,
  status: null,
  message: '',
  error: null,
  galleries: [],
};

export const createAsset = createAsyncThunk<
  AssetType.Asset,
  CreateAssetParams,
  { dispatch: AppDispatch; state: RootState }
>('asset/createAsset', async (params: CreateAssetParams, thunkAPI) => {
  try {
    return await assetApi.createAsset(params);
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

export const createGallery = createAsyncThunk<
  AssetType.Gallery,
  CreateGalleryParams,
  { dispatch: AppDispatch; state: RootState }
>('asset/createGallery', async (params: CreateGalleryParams, thunkAPI) => {
  try {
    return await assetApi.createGallery(params);
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

export const deleteGallery = createAsyncThunk<
  CommonType.Message,
  DeleteGalleryParams,
  { dispatch: AppDispatch; state: RootState }
>('asset/deleteGallery', async (params: DeleteGalleryParams, thunkAPI) => {
  try {
    return await assetApi.deleteGallery(params);
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

// Actual Slice
export const assetSlice = createSlice({
  name: 'asset',
  initialState,
  reducers: {
    clearAssetMessage: (
      state: ReduxJson.AssetState,
      _payload: PayloadAction<string>
    ) => {
      state.error = null;
      state.message = null;
    },
    setGalleries: (
      state: ReduxJson.AssetState,
      { payload }: PayloadAction<AssetType.Gallery[]>
    ) => {
      state.galleries = payload;
    },
    removeGalleryItem: (
      state: ReduxJson.AssetState,
      { payload }: PayloadAction<number>
    ) => {
      state.galleries = state.galleries.splice(payload, 1);
    },
    addGalleryItem: (
      state: ReduxJson.AssetState,
      { payload }: PayloadAction<AssetType.Gallery>
    ) => {
      state.galleries = [...state.galleries, payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAsset.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(
        createAsset.fulfilled,
        (state, { payload }: PayloadAction<AssetType.Asset>) => {
          state.loading = false;
          console.log(payload);
          state.galleries = [
            ...state.galleries,
            { id: 0, assetId: payload.id, asset: payload },
          ];
          console.log(state.galleries);
          state.status = ResponseStatus.SUCCESS;
          state.message = 'Asset Created';
        }
      )
      .addCase(createAsset.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      })
      .addCase(createGallery.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(
        createGallery.fulfilled,
        (state, _payload: PayloadAction<AssetType.Gallery>) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
        }
      )
      .addCase(createGallery.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      })
      .addCase(deleteGallery.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(
        deleteGallery.fulfilled,
        (state, { payload }: PayloadAction<CommonType.Message>) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
          state.message = payload.message;
        }
      )
      .addCase(deleteGallery.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      });
  },
});

export const {
  clearAssetMessage,
  setGalleries,
  removeGalleryItem,
  addGalleryItem,
} = assetSlice.actions;

export const assetSelector = (state: RootState) => state.asset;

export default assetSlice.reducer;
