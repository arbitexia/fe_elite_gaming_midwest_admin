import { useAppToast } from '@/providers';
import {
  getProduct,
  getProducts,
  // createProduct,
  // deleteProduct,
  // updateProduct,
  productSelector,
  resetProductMessage,
  setGalleries,
} from '@/redux/slices';

import {
  GetProductsParam,
  // CreateProductParam,
  // UpdateProductParam,
  ProductType,
} from '@/types';
import { useEffect } from 'react';
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
    const product = products.find((product: ProductType) => product.id === id);
    dispatch(setGalleries(product?.gallery ?? []));
    return product;
  };

  const onProductSelect = async (id: number) => {
    await dispatch(getProduct(id));
  };

  const onGetProducts = async (param: GetProductsParam) => {
    await dispatch(getProducts(param));
  };

  // const onCreateProduct = async (param: CreateProductParam) => {
  //   await dispatch(createProduct(param));
  // };

  // const onUpdateProduct = async (param: UpdateProductParam) => {
  //   await dispatch(updateProduct(param));
  // };

  // const onDeleteProduct = async (id: number) => {
  //   await dispatch(deleteProduct({ productId: id }));
  // };

  return {
    products,
    currentProduct,
    pageInfo,
    currentId,
    onGetProductById,
    onProductSelect,
    onGetProducts,
    // onCreateProduct,
    // onUpdateProduct,
    // onDeleteProduct,
  };
};
