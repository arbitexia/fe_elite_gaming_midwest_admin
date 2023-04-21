import { UserStatus } from '@/constants/enum';
import { Location } from './location.type';

export declare namespace TabletType {
  type Data = {
    id: number;
    name: string;
    status?: UserStatus;
    locationId?: number;
    location?: Location.Data;
    password?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  type Param = {
    filterBy: {
      status: string;
      search?: string;
      sort?: string;
    };
    cursor?: {
      page: number;
      size: number;
    };
  };
  type Input = {
    input: {
      id: number;
      name: string;
      status: UserStatus;
      locationId: number;
      password?: string;
    };
  };
  type ChangePasswordParam = {
    tabletId: number;
    oldPassword: string;
    password: string;
  };
}
