import { Location, UserType, Reward } from '@/types';

export interface TransactionsProps {
  transactionItem: TransactionType;
}

export type TransactionType = {
  id: number;
  user: UserType.MockUser;
  location: Location.Data;
  reward: Reward.Data;
  assignee: UserType.MockUser;
  type: string;
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};
