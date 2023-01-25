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
} from '@/redux/slices';

export const useAsset = () => {
  const appToast = useAppToast();
  // const router = useRouter();
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

  const onDeleteImage = async (index: number) => {
    if (galleries[index].id !== 0) {
      await dispatch(deleteGallery({ galleryId: galleries[index].id }));
    }
    dispatch(removeGalleryItem(index));
  };

  const onCreateAsset = async (file: File) => {
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
    assetApi.uploadForm(presignedPostData.url, formData);
    dispatch(
      createAsset({
        input: {
          desc: '',
          name: file.name,
          type: AssetItemType.IMAGE,
          url,
        },
      })
    );
  };

  const onCreateGallery = async (victimId: number, model: string) => {
    galleries.forEach(async (gallery) => {
      gallery.id === 0 &&
        (await dispatch(
          createGallery({
            input: {
              assetId: gallery.assetId,
              victimId,
              model,
            },
          })
        ));
    });
  };

  return {
    galleries,
    onSetGalleries,
    onCreateAsset,
    onCreateGallery,
    onDeleteImage,
  };
};
