import { Location, UserType, Reward } from '@/types';

export interface TransactionsProps {
  transactionItem: TransactionType;
}

export type TransactionType = {
  id: number;
  user: UserType.User;
  location: Location.Data;
  reward: Reward.Data;
  assignee: UserType.User;
  type: string;
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type TransactionFilterType = {
  filterBy: {
    search: string;
  };
  cursor: {
    page: number;
    size: number;
  };
};
