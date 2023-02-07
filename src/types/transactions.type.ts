import { LocationType, UserType, RewardItemType, AwardType } from '@/types';

export interface TransactionsProps {
  transactionItem: AwardType;
}

export type TransactionType = {
  id: number;
  user: UserType.MockUser;
  location: LocationType;
  reward: RewardItemType;
  assignee: UserType.MockUser;
  type: string;
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};
