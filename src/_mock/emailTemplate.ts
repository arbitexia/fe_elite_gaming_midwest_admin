import { EmailTemplateType } from '@/types';

export const emailTemplateMockData: EmailTemplateType.Data[] = [
  {
    id: 0,
    name: 'Login Template',
    subject: 'Welcome',
    htmlBody: '',
    status: 'ARCHIVED',
    type: 'default',
    createdAt: '14/06/2001',
  },
];

export const emailTemplateStatus = [
  { id: 'PENDING', value: 'PENDING' },
  { id: 'PUBLISHED', value: 'PUBLISHED' },
  { id: 'ARCHIVED', value: 'ARCHIVED' },
];

export const emailTemplateType = [
  { id: 'DEFAULT', value: 'DEFAULT' },
  { id: 'DYNAMIC', value: 'DYNAMIC' },
];
