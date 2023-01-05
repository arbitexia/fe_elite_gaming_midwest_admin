export declare namespace AssetType {
  enum AssetType {
    IMAGE = 'IMAGE',
    VIDEO = 'VIDEO',
    DOCUMENT = 'DOCUMENT',
  }

  type Asset = {
    name: string;
    id: string;
    desc?: string;
    type: string;
    url: string;
  };
}
