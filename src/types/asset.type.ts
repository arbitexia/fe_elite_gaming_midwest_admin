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
    type: AssetType.AssetType;
    url: string;
  };
};

export type CreateGalleryParams = {
  input: {
    assetId: number;
    victimId: number;
    model: string;
  };
};

export type DeleteGalleryParams = {
  galleryId: number;
};

export declare namespace AssetType {
  enum AssetType {
    IMAGE = 'IMAGE',
    VIDEO = 'VIDEO',
    DOCUMENT = 'DOCUMENT',
  }

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
