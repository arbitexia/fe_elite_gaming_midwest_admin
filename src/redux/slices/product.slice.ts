import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { productApi } from '@/redux/apis';
import { AxiosError } from 'axios';
import { RootState, AppDispatch } from '@/redux/store';
import {
  ReduxJson,
  GetProductsParam,
  ResponseStatus,
  ProductType,
  CommonType,
} from '@/types';

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
  CommonType.Pagination<ProductType>,
  GetProductsParam,
  { dispatch: AppDispatch; state: RootState }
>('product/getProducts', async (params: GetProductsParam, thunkAPI) => {
  try {
    return await productApi.getProducts(params);
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

export const getProduct = createAsyncThunk<
  ProductType,
  number,
  { dispatch: AppDispatch; state: RootState }
>('product/getProduct', async (params: number, thunkAPI) => {
  try {
    return await productApi.getProduct(params);
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

export const createProduct = createAsyncThunk<
  ProductType,
  ProductType,
  { dispatch: AppDispatch; state: RootState }
>('product/createProduct', async (params: ProductType, thunkAPI) => {
  try {
    return await productApi.createProduct(params);
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data);
  }
});

// export const updateProduct = createAsyncThunk<
//   ProductType.Product,
//   UpdateProductParam,
//   { dispatch: AppDispatch; state: RootState }
// >('product/updateProduct', async (params: UpdateProductParam, thunkAPI) => {
//   try {
//     return await productApi.updateProduct(params);
//   } catch (error) {
//     const err = error as AxiosError;
//     return thunkAPI.rejectWithValue(err.response?.data);
//   }
// });

// export const deleteProduct = createAsyncThunk<
//   CommonType.Message,
//   DeleteProductParam,
//   { dispatch: AppDispatch; state: RootState }
// >('product/deleteProduct', async (params: DeleteProductParam, thunkAPI) => {
//   try {
//     return await productApi.deleteProduct(params);
//   } catch (error) {
//     const err = error as AxiosError;
//     return thunkAPI.rejectWithValue(err.response?.data);
//   }
// });

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
          { payload }: PayloadAction<CommonType.Pagination<ProductType>>
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
        (state, { payload }: PayloadAction<ProductType>) => {
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
        (state, { payload }: PayloadAction<ProductType>) => {
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
      });
    // .addCase(updateProduct.pending, (state) => {
    //   state.loading = true;
    //   state.status = ResponseStatus.PENDING;
    //   state.error = null;
    //   state.message = null;
    // })
    // .addCase(
    //   updateProduct.fulfilled,
    //   (state, { payload }: PayloadAction<ProductType.Product>) => {
    //     state.loading = false;
    //     state.status = ResponseStatus.SUCCESS;
    //     state.currentProduct = payload;
    //     state.currentId = payload.id;
    //   }
    // )
    // .addCase(updateProduct.rejected, (state, { payload }) => {
    //   state.loading = false;
    //   state.status = ResponseStatus.FAILED;
    //   state.error = payload as string;
    //   state.message = null;
    // })
    // .addCase(deleteProduct.pending, (state) => {
    //   state.loading = true;
    //   state.status = ResponseStatus.PENDING;
    //   state.error = null;
    //   state.message = null;
    // })
    // .addCase(
    //   deleteProduct.fulfilled,
    //   (state, { payload }: PayloadAction<CommonType.Message>) => {
    //     state.loading = false;
    //     state.status = ResponseStatus.SUCCESS;
    //     state.message = payload.message;
    //   }
    // )
    // .addCase(deleteProduct.rejected, (state, { payload }) => {
    //   state.loading = false;
    //   state.status = ResponseStatus.FAILED;
    //   state.error = payload as string;
    //   state.message = null;
    // });
  },
});

export const { resetProductMessage } = productSlice.actions;

export const productSelector = (state: RootState) => state.product;

export default productSlice.reducer;
