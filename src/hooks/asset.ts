import { useEffect } from 'react';
import { useAppToast } from '@/providers';
import { useAppDispatch, useAppSelector } from './redux';
import {
  AssetItemType,
  AssetType,
  PresignedPostType,
  ResponseStatus,
} from '@/types';
import { assetApi } from '@/redux/apis';
import {
  assetSelector,
  clearAssetMessage,
  setGalleries,
  removeGalleryItem,
  createAsset,
  createGallery,
  deleteGallery,
  updateGallery,
  addGalleryItem,
} from '@/redux/slices';
import { PayloadAction } from '@reduxjs/toolkit';

export const useAsset = () => {
  const appToast = useAppToast();
  const { message, error, loading, galleries, status } =
    useAppSelector(assetSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loading) return;
    error && appToast({ severity: 'error', message: error });
    if (status === ResponseStatus.SUCCESS && message) {
      appToast({ severity: 'success', message: message });
      dispatch(clearAssetMessage(''));
    }
  }, [loading]);

  const onSetGalleries = (galleries: AssetType.Gallery[]) => {
    dispatch(setGalleries(galleries));
  };

  const onAddGallery = (gallery: AssetType.Gallery) => {
    dispatch(addGalleryItem(gallery));
  };

  const onDeleteImage = async (index: number) => {
    if (galleries[index].id !== 0) {
      await dispatch(deleteGallery({ galleryId: galleries[index].id }));
    }
    dispatch(removeGalleryItem(index));
  };

  const uploadImageS3 = async (file: File) => {
    const presignedPostData: PresignedPostType =
      await assetApi.createUploadForm({
        fileName: file.name,
      });
    const url = `${presignedPostData.url}/${presignedPostData.fields.key}`;
    const formData = new FormData();
    Object.keys(presignedPostData.fields).forEach((key) => {
      formData.append(key, presignedPostData.fields[key]);
    });

    formData.append('file', file);
    await assetApi.uploadForm(presignedPostData.url, formData);
    return url;
  };

  const onCreateAsset = async (file: File): Promise<AssetType.Asset> => {
    const url = await uploadImageS3(file);
    const gallery: PayloadAction<unknown> = await dispatch(
      createAsset({
        input: {
          desc: '',
          name: file.name,
          type: AssetItemType.IMAGE,
          url,
        },
      })
    );
    return gallery.payload as AssetType.Asset;
  };

  const onSaveGallery = async (victimId: number, model: string) => {
    galleries.forEach(async (gallery, index) => {
      if (gallery.id === 0) {
        dispatch(removeGalleryItem(index));
        await dispatch(
          createGallery({
            input: {
              assetId: gallery.assetId,
              victimId,
              model,
            },
          })
        );
      }
    });
  };

  const onUpdateGallery = async (index: number, asset: AssetType.Asset) => {
    const gallery = galleries[index];
    if (gallery.id === 0) {
      const tmp = [...galleries];
      tmp[index] = {
        id: 0,
        assetId: asset.id,
        asset,
      };
      dispatch(setGalleries(tmp));
    } else await dispatch(updateGallery({ id: gallery.id, assetId: asset.id }));
  };

  return {
    galleries,
    onAddGallery,
    onSetGalleries,
    onCreateAsset,
    onSaveGallery,
    onUpdateGallery,
    onDeleteImage,
  };
};
