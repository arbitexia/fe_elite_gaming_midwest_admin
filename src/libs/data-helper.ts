import config from '@/config';
import {
  EmailTemplateStatusEnum,
  RequestStatus,
  RewardStatus,
  TransactionStatus,
  UserStatus,
} from '@/constants/enum';

export const getColor = (value: string) => {
  if (
    value === UserStatus.ACTIVATED ||
    value === RequestStatus.ACCEPTED ||
    value === RewardStatus.AVAILABLE ||
    value === TransactionStatus.ACCEPTED ||
    value === EmailTemplateStatusEnum.PUBLISHED
  ) {
    return 'success';
  } else if (
    value === UserStatus.DISABLED ||
    value === RequestStatus.DECLINED ||
    value === RewardStatus.OUT ||
    value === TransactionStatus.DECLINED
  ) {
    return 'error';
  } else if (
    value === UserStatus.ARCHIVED ||
    value === RequestStatus.WAITING ||
    value === TransactionStatus.WAITING
  ) {
    return 'info';
  } else {
    return 'default';
  }
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

export const hasElInArray = (data: unknown[]) => data.length > 0;

export const formatPhoneNumber = (str: string) => {
  const cleaned = ('' + str).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return null;
};

export const phoneNumberToString = (str: string) => {
  return ('' + str).replace(/\D/g, '');
};
