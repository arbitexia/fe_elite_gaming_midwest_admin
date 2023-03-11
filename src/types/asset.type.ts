import { Assets } from '@/constants';

export type CreateUploadFormParams = {
  fileName: string;
};

export type PresignedPostType = {
  url: string;
  fields: {
    Policy: string;
    [key: string]: string;
  };
};

export type CreateAssetParams = {
  input: {
    desc: string;
    name: string;
    type: Assets;
    url: string;
  };
};

export type CreateGalleryParams = {
  input: {
    desc?: string;
    name?: string;
    type?: Assets;
    assetId?: number;
    url?: string;
    victimId: number;
    model: string;
  };
};

export type UpdateGalleryParams = {
  id: number;
  assetId: number;
};

export type DeleteGalleryParams = {
  galleryId: number;
};

export declare namespace AssetType {
  type Asset = {
    id: number;
    name: string;
    desc?: string;
    type: string;
    url: string;
  };

  type Gallery = {
    id: number;
    assetId: number;
    victimId?: number;
    asset?: Asset;
    model?: string;
  };
}
