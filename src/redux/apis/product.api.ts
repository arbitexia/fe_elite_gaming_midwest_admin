/**
 * Copyright (c) 2022, Red Vector, Inc.
 * All rights reserved
 */

/**
 * Author: Daniel Pit
 */
import { jwtAxios } from './axios.api';
import { getAuthorizeHeader } from '@/libs/data-helper';
import {
  GetProductsParam,
  // GetProductParam,
  // CreateProductParam,
  // UpdateProductParam,
  // DeleteProductParam,
} from '@/types';

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

// export const createProduct = async (params: CreateProductParam) => {
//   const response = await jwtAxios.post(`/products`, params, {
//     headers: getAuthorizeHeader(),
//   });
//   return response.data;
// };

// export const updateProduct = async (params: UpdateProductParam) => {
//   const response = await jwtAxios.put(`/products/${params.id}`, params, {
//     headers: getAuthorizeHeader(),
//   });
//   return response.data;
// };

// export const deleteProduct = async (params: DeleteProductParam) => {
//   const response = await jwtAxios.delete(`/products/${params.productId}`, {
//     headers: getAuthorizeHeader(),
//   });
//   return response.data;
// };
