import { UserStatus } from '@/constants/Enum';

export const getColor = (value: string) => {
  if (value === UserStatus.ACTIVATED) return 'success';
  else if (value === UserStatus.DISABLED) return 'error';
  else if (value === UserStatus.ARCHIVED) return 'info';
  else return 'default';
};
