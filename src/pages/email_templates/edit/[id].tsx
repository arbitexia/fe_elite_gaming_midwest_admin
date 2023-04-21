import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { DashboardLayout } from '@/layouts';
import { useEmailTemplate } from '@/hooks';
import { EmailTemplateType } from '@/types';

import { EditEmailTemplate } from '@/modules/EmailTemplate';

const EditEmailTemplatePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { emailTemplates, onCreateEmailTemplate } = useEmailTemplate();

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
    if (id) {
      const filteredItem = emailTemplates.find((obj) => obj.id === Number(id));
      if (!filteredItem) {
        router.push('/email_templates');
        return;
      }
      setSelectedEmailTemplate(filteredItem);
    }
  }, [id]);

  return (
    <DashboardLayout title="EmailTemplate">
      {selectedEmailTemplate && (
        <EditEmailTemplate
          title="Edit Email Template"
          emailTemplate={selectedEmailTemplate}
          onAction={handleClickAction}
        />
      )}
    </DashboardLayout>
  );
};

export default EditEmailTemplatePage;
