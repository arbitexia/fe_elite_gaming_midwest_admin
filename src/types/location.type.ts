import { AssetType } from './asset.type';
import { CommonType } from './common.type';

export declare namespace Location {
  type Data = {
    id: number;
    name: string;
    coords: { lat: number; lng: number };
    address: CommonType.Address;
    status: string;
    type: string;
    description?: string;
    gallery?: AssetType.Gallery[];
    createdAt?: string;
  };

  type Param = { id: number };

  type Body = {
    input: {
      name: string;
      coords: { lat: number; lng: number };
      address: CommonType.Address;
      description: string;
      status: string;
      type: string;
    };
  };

  type Filter = {
    filterBy: {
      search: string;
    };
  };
}
