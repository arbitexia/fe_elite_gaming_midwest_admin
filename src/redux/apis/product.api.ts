import { jwtAxios } from './axios.api';
import { getAuthorizeHeader } from '@/libs/data-helper';
import {
  CreateProductParam,
  FilterProductsParam,
  GetProductParam,
  UpdateProductParam,
  DeleteProductParam,
} from '@/types';

export const getProducts = async (params: FilterProductsParam) => {
  const response = await jwtAxios.get(`/products`, {
    params,
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const getProduct = async (param: GetProductParam) => {
  const response = await jwtAxios.get(`/products/${param.id}`, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const createProduct = async (params: CreateProductParam) => {
  const response = await jwtAxios.post(`/products`, params, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const updateProduct = async (params: UpdateProductParam) => {
  const response = await jwtAxios.put(`/products/${params.id}`, params, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const deleteProduct = async (params: DeleteProductParam) => {
  const response = await jwtAxios.delete(`/products/${params.productId}`, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};
