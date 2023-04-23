import { useEffect } from 'react';
import { useAppToast } from '@/providers';
import {
  getEmailTemplates,
  createEmailTemplate,
  deleteEmailTemplate,
  sendTestEmail,
  resetEmailTemplateMessage,
  emailTemplateSelector,
} from '@/redux/slices';
import { useAppSelector, useAppDispatch } from './redux';
import { EmailTemplateType } from '@/types';
import { PayloadAction } from '@reduxjs/toolkit';

export const useEmailTemplate = () => {
  const appToast = useAppToast();
  const { emailTemplates, pageInfo, loading, message, error } = useAppSelector(
    emailTemplateSelector
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loading) return;
    if (message) appToast({ severity: 'success', message: message });
    if (error) appToast({ severity: 'error', message: error });
    dispatch(resetEmailTemplateMessage(null));
  }, [loading]);

  const onGetEmailTemplates = async (param: EmailTemplateType.Filter) => {
    await dispatch(getEmailTemplates(param));
  };

  const onCreateEmailTemplate = async (
    body: EmailTemplateType.Body
  ): Promise<EmailTemplateType.Data> => {
    const { payload }: PayloadAction<unknown> = await dispatch(
      createEmailTemplate(body)
    );
    return payload as EmailTemplateType.Data;
  };

  const onDeleteEmailTemplate = async (id: number) => {
    await dispatch(deleteEmailTemplate(id));
  };

  const onSendTestEmail = async (body: EmailTemplateType.SendEmail) => {
    await dispatch(sendTestEmail(body));
  };

  return {
    emailTemplates,
    pageInfo,
    onGetEmailTemplates,
    onCreateEmailTemplate,
    onDeleteEmailTemplate,
    onSendTestEmail,
  };
};
