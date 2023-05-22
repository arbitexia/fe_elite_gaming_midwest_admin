import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { DashboardLayout } from '@/layouts';
import { useEmailTemplate } from '@/hooks';
import { EmailTemplateType } from '@/types';

import { EditEmailTemplate } from '@/modules/EmailTemplate';

const EditEmailTemplatePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    emailTemplates,
    onCreateEmailTemplate,
    onGetSendinBlueEmails,
    sendinEmails,
  } = useEmailTemplate();

  const [selectedEmailTemplate, setSelectedEmailTemplate] =
    useState<EmailTemplateType.Data>();

  const handleClickAction = async (value: EmailTemplateType.Body) => {
    try {
      await onCreateEmailTemplate(value);
      router.push('/email_templates');
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchSendinBlueEmails = async () => {
      try {
        await onGetSendinBlueEmails();
      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
      const filteredItem = emailTemplates.find((obj) => obj.id === Number(id));
      if (!filteredItem) {
        router.push('/email_templates');
        return;
      }
      setSelectedEmailTemplate(filteredItem);
      if (sendinEmails?.length === 0) {
        fetchSendinBlueEmails();
      }
    }
  }, [id]);

  return (
    <DashboardLayout title="EmailTemplate">
      {selectedEmailTemplate && (
        <EditEmailTemplate
          title="Edit Email Template"
          emailTemplate={selectedEmailTemplate}
          sendinBlueEmailsOptions={
            sendinEmails?.map((obj) => {
              return { id: obj.id, value: obj.name };
            }) ?? []
          }
          onAction={handleClickAction}
        />
      )}
    </DashboardLayout>
  );
};

export default EditEmailTemplatePage;
