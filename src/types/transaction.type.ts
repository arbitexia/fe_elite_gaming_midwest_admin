import { TransactionStatus } from '@/constants';
import { Location } from './location.type';
import { Reward } from './reward.type';
import { UserType } from './users.type';
import { PointType } from './point.type';

export declare namespace TransactionType {
  type Data = {
    id: number;
    user: UserType.User;
    reward: Reward.Data;
    location: Location.Data;
    assignee: UserType.User;
    pointId?: number;
    point?: PointType;
    type: string;
    status: string;
    amount: number;
    acceptedAt: string;
    createdAt: string;
    updatedAt: string;
  };

  type Param = {
    assignee: UserType.User;
    status: TransactionStatus;
    transactionId: number;
  };

  type Filter = {
    filterBy: {
      status?: string;
      search: string;
      sort?: string;
      type?: string;
    };
    cursor: {
      page: number;
      size: number;
    };
  };
}
