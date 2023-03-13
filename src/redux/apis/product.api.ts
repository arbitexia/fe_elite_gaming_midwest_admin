import { jwtAxios } from './axios.api';
import { getAuthorizeHeader } from '@/libs/data-helper';
import { Product } from '@/types';

export const getProducts = async (params: Product.Filter) => {
  const response = await jwtAxios.get(`/products`, {
    params,
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const getProduct = async (param: Product.Param) => {
  const response = await jwtAxios.get(`/products/${param.id}`, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const createProduct = async (params: Product.Body) => {
  const response = await jwtAxios.post(`/products`, params, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const updateProduct = async (params: Product.Param & Product.Body) => {
  const response = await jwtAxios.put(`/products/${params.id}`, params, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const deleteProduct = async (params: Product.Param) => {
  const response = await jwtAxios.delete(`/products/${params.id}`, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};
