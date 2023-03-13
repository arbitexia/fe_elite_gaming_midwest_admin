import { Location, UserType, RewardItemType } from '@/types';

export interface TransactionsProps {
  transactionItem: TransactionType;
}

export type TransactionType = {
  id: number;
  user: UserType.MockUser;
  location: Location;
  reward: RewardItemType;
  assignee: UserType.MockUser;
  type: string;
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};
