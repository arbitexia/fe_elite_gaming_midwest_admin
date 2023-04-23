import { AssetType } from './asset.type';

export declare namespace EmailTemplateType {
  type Data = {
    id: number;
    name: string;
    subject: string;
    htmlBody: string;
    status: string;
    type: string;
    category: string;
    attachedFiles?: AssetType.Gallery[];
    createdAt?: string;
  };

  type Param = { id: number };

  type Body = {
    input: {
      id?: number;
      name: string;
      subject: string;
      htmlBody: string;
      status: string;
      type: string;
      category: string;
    };
  };

  type Filter = {
    filterBy: {
      search: string;
    };
    cursor: {
      page: number;
      size: number;
    };
  };

  type SendEmail = {
    id?: number;
    from?: string;
    to: string;
  };
}
