import { useEffect } from 'react';
import { PayloadAction } from '@reduxjs/toolkit';
import { useAppToast } from '@/providers';
import {
  getProduct,
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  productSelector,
  resetProductMessage,
  setGalleries,
} from '@/redux/slices';
import { Product } from '@/types';
import { useAppSelector, useAppDispatch } from './redux';

export const useProduct = () => {
  const appToast = useAppToast();
  const {
    products,
    pageInfo,
    currentProduct,
    currentId,
    loading,
    message,
    error,
  } = useAppSelector(productSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loading) return;
    if (message) appToast({ severity: 'success', message: message });
    if (error) appToast({ severity: 'error', message: error });
    dispatch(resetProductMessage(null));
  }, [loading]);

  const onGetProductById = (id: number) => {
    const product = products.find((product) => product.id === id);
    dispatch(setGalleries(product?.gallery ?? []));
    return product;
  };

  const onProductSelect = async (param: Product.Param) => {
    await dispatch(getProduct(param));
  };

  const onGetProducts = async (param: Product.Filter) => {
    await dispatch(getProducts(param));
  };

  const onCreateProduct = async (
    param: Product.Body
  ): Promise<Product.Data> => {
    const { payload }: PayloadAction<unknown> = await dispatch(
      createProduct(param)
    );
    return payload as Product.Data;
  };

  const onUpdateProduct = async (param: Product.Param & Product.Body) => {
    await dispatch(updateProduct(param));
  };

  const onDeleteProduct = async (param: Product.Param) => {
    await dispatch(deleteProduct(param));
  };

  return {
    products,
    currentProduct,
    pageInfo,
    currentId,
    onGetProductById,
    onProductSelect,
    onGetProducts,
    onCreateProduct,
    onUpdateProduct,
    onDeleteProduct,
  };
};
