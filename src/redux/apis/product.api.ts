/**
 * Copyright (c) 2022, Red Vector, Inc.
 * All rights reserved
 */

/**
 * Author: Daniel Pit
 */
import { jwtAxios } from './axios.api';
import { getAuthorizeHeader } from '@/libs/data-helper';
import { GetProductsParam, ProductType } from '@/types';

export const getProducts = async (params: GetProductsParam) => {
  const response = await jwtAxios.get(`/products`, {
    params,
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const getProduct = async (params: number) => {
  const response = await jwtAxios.get(`/products/${params}`, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const createProduct = async (params: ProductType) => {
  const response = await jwtAxios.post(
    `/products`,
    { input: params },
    {
      headers: getAuthorizeHeader(),
    }
  );
  return response.data;
};

export const updateProduct = async (params: ProductType) => {
  const response = await jwtAxios.put(
    `/products/${params.id}`,
    { input: params },
    {
      headers: getAuthorizeHeader(),
    }
  );
  return response.data;
};

export const deleteProduct = async (params: number) => {
  const response = await jwtAxios.delete(`/products/${params}`, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};
