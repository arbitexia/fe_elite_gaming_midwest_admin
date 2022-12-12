import { UserStatus, RequestStatus, RewardStatus } from '@/constants/Enum';

export const getColor = (value: string) => {
  if (
    value === UserStatus.ACTIVATED ||
    value === RequestStatus.ACCEPTED ||
    value === RewardStatus.AVAILABLE
  )
    return 'success';
  else if (
    value === UserStatus.DISABLED ||
    value === RequestStatus.DECLINED ||
    value === RewardStatus.OUT
  )
    return 'error';
  else if (value === UserStatus.ARCHIVED || value === RequestStatus.WAITING)
    return 'info';
  else return 'default';
};
