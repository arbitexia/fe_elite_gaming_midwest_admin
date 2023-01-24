import { UserStatus, RequestStatus, RewardStatus } from '@/constants/Enum';
import config from '@/config';

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

export const getHeader = () => {
  return {
    headers: {
      'Access-Control-Allow-Origin': config.API_URL || '',
      'Access-Control-Allow-Methods': 'GET,POST',
    },
  };
};

export const convertMBtoBytes = (mbValue: number) => mbValue * 1048576;

export const getAuthorizeHeader = () => {
  return {
    'Access-Control-Allow-Origin': config.API_URL || '',
    'Access-Control-Allow-Methods': 'GET,POST',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
};
