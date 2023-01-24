/**
 * Copyright (c) 2022, Red Vector, Inc.
 * All rights reserved
 */

/**
 * Author: Dan Finkel
 */
import {
  CreateAssetParams,
  CreateGalleryParams,
  CreateUploadFormParams,
  DeleteGalleryParams,
} from '@/types';
import { jwtAxios } from './axios.api';
import { getAuthorizeHeader } from '@/libs/data-helper';
import axios from 'axios';

export const createUploadForm = async (params: CreateUploadFormParams) => {
  const response = await jwtAxios.post(`/new_upload_form`, params, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const uploadForm = async (url: string, formData: FormData) => {
  await axios.post(url, formData);
};

export const createAsset = async (params: CreateAssetParams) => {
  const response = await jwtAxios.post(`/asset`, params, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const deleteGallery = async (params: DeleteGalleryParams) => {
  const response = await jwtAxios.delete(`/gallery`, {
    headers: getAuthorizeHeader(),
    params,
  });
  return response.data;
};

export const createGallery = async (params: CreateGalleryParams) => {
  const response = await jwtAxios.post(`/gallery`, params, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};
