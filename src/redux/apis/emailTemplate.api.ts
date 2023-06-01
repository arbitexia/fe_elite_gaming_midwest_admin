import { jwtAxios } from './axios.api';
import { getAuthorizeHeader } from '@/libs/data-helper';
import { EmailTemplateType } from '@/types';

export const getEmailTemplates = async (params: EmailTemplateType.Filter) => {
  const response = await jwtAxios.get(`/email_templates`, {
    params,
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const getEmailTemplateById = async (params: EmailTemplateType.Param) => {
  const response = await jwtAxios.get(`/email_template/${params.id}`, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const createEmailTemplate = async (body: EmailTemplateType.Body) => {
  const response = await jwtAxios.post(`/email_template`, body, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const deleteEmailTemplate = async (id: number) => {
  const response = await jwtAxios.delete(`/email_template/${id}`, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const sendTestEmail = async (body: EmailTemplateType.SendEmail) => {
  const response = await jwtAxios.post(`/send_test_email`, body, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};
export const getSendinBlueEmails = async () => {
  const response = await jwtAxios.get(`/sendinblue/email_templates`, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const sendCampaignEmail = async (
  body: EmailTemplateType.UserCampaignType
) => {
  const response = await jwtAxios.post(`/send_campaign_email`, body, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};

export const followUpEmail = async (
  body: EmailTemplateType.FollowUpEmailType
) => {
  const response = await jwtAxios.post(`/followup_email`, body, {
    headers: getAuthorizeHeader(),
  });
  return response.data;
};
