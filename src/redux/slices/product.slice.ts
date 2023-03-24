import { AxiosError } from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseStatus } from '@/constants';
import { productApi } from '@/redux/apis';
import { RootState, AppDispatch } from '@/redux/store';
import { ReduxJson, Product, CommonType } from '@/types';

// Initial state
const initialState: ReduxJson.ProductState = {
  loading: true,
  status: null,
  products: [],
  pageInfo: null,
  currentId: 0,
  currentProduct: null,
  message: null,
  error: null,
};

export const getProducts = createAsyncThunk<
  CommonType.Pagination<Product.Data>,
  Product.Filter,
  { dispatch: AppDispatch; state: RootState }
>('product/getProducts', async (params: Product.Filter, thunkAPI) => {
  try {
    return await productApi.getProducts(params);
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

export const getProduct = createAsyncThunk<
  Product.Data,
  Product.Param,
  { dispatch: AppDispatch; state: RootState }
>('product/getProduct', async (param: Product.Param, thunkAPI) => {
  try {
    return await productApi.getProduct(param);
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

export const createProduct = createAsyncThunk<
  Product.Data,
  Product.Body,
  { dispatch: AppDispatch; state: RootState }
>('product/createProduct', async (params: Product.Body, thunkAPI) => {
  try {
    return await productApi.createProduct(params);
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

export const updateProduct = createAsyncThunk<
  Product.Data,
  Product.Param & Product.Body,
  { dispatch: AppDispatch; state: RootState }
>(
  'product/updateProduct',
  async (params: Product.Param & Product.Body, thunkAPI) => {
    try {
      return await productApi.updateProduct(params);
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

export const deleteProduct = createAsyncThunk<
  CommonType.Message & { id: string },
  Product.Param,
  { dispatch: AppDispatch; state: RootState }
>('product/deleteProduct', async (params: Product.Param, thunkAPI) => {
  try {
    return await productApi.deleteProduct(params);
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

// Actual Slice
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    resetProductMessage: (state: ReduxJson.ProductState, _payload) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(
        getProducts.fulfilled,
        (
          state,
          { payload }: PayloadAction<CommonType.Pagination<Product.Data>>
        ) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
          state.pageInfo = payload.pageInfo;
          state.products = payload.data;
        }
      )
      .addCase(getProducts.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      })
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(
        getProduct.fulfilled,
        (state, { payload }: PayloadAction<Product.Data>) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
          state.currentProduct = payload;
          state.currentId = payload.id;
        }
      )
      .addCase(getProduct.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(
        createProduct.fulfilled,
        (state, { payload }: PayloadAction<Product.Data>) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
          state.currentProduct = payload;
          state.currentId = payload.id;
        }
      )
      .addCase(createProduct.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(
        updateProduct.fulfilled,
        (state, { payload }: PayloadAction<Product.Data>) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
          state.products = state.products.map((p) => {
            if (p.id === payload.id) {
              return payload;
            } else {
              return p;
            }
          });
          state.currentProduct = payload;
          state.currentId = payload.id;
        }
      )
      .addCase(updateProduct.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.status = ResponseStatus.PENDING;
        state.error = null;
        state.message = null;
      })
      .addCase(
        deleteProduct.fulfilled,
        (
          state,
          { payload }: PayloadAction<CommonType.Message & { id: string }>
        ) => {
          state.loading = false;
          state.status = ResponseStatus.SUCCESS;
          state.message = payload.message;
          state.products = state.products.filter(
            (product) => product.id !== parseInt(payload.id)
          );
        }
      )
      .addCase(deleteProduct.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = ResponseStatus.FAILED;
        state.error = payload as string;
        state.message = null;
      });
  },
});

export const { resetProductMessage } = productSlice.actions;

export const productSelector = (state: RootState) => state.product;

export default productSlice.reducer;
