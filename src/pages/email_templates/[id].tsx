import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useEmailTemplate } from '@/hooks';
import { DashboardLayout } from '@/layouts';
import {
  EmailTemplateDetailHeader,
  EmailTemplateDetailInfo,
  TestEmailDialog,
} from '@/modules/EmailTemplate';
import { Divider } from '@mui/material';

const EmailTemplateDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { emailTemplate, onGetEmailTemplateById, onSendTestEmail } =
    useEmailTemplate();
  const [openTestEmailModal, setOpenTestEmailModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number>();

  useEffect(() => {
    const fetchEmailTemplateById = async () => {
      try {
        await onGetEmailTemplateById({ id: Number(id) });
      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
      fetchEmailTemplateById();
    }
  }, [id]);

  const handleTestEmailSend = async (value: string) => {
    try {
      if (selectedId) {
        await onSendTestEmail({ id: selectedId, to: value });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout title="EmailTemplate">
      <EmailTemplateDetailHeader
        onAction={(id) => {
          setOpenTestEmailModal(true);
          setSelectedId(id);
        }}
      />
      <Divider sx={{ mt: '18px', mb: '30px' }} />
      {emailTemplate && (
        <EmailTemplateDetailInfo emailTemplate={emailTemplate} />
      )}

      <TestEmailDialog
        onClose={() => {
          setOpenTestEmailModal(false);
          setSelectedId(undefined);
        }}
        open={openTestEmailModal}
        title="Test Email"
        onSend={handleTestEmailSend}
      />
    </DashboardLayout>
  );
};

export default EmailTemplateDetailPage;
