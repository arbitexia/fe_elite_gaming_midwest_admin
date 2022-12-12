import { LocationType, UserType, RewardItemType } from '@/types';

export interface TransactionsProps {
  transactionItem: TransactionType;
}

export type TransactionType = {
  id: number;
  user: UserType;
  location: LocationType;
  reward: RewardItemType;
  assignee: UserType;
  type: string;
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};
