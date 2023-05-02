import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { DashboardLayout } from '@/layouts';
import {
  EmailTemplateHeader,
  EmailTemplatePagination,
  EmailTemplateTable,
} from '@/modules/EmailTemplate';
import { Divider } from '@mui/material';
import { useEmailTemplate } from '@/hooks/emailTemplate';
import { EmailTemplateType } from '@/types';

const EmailTemplate = () => {
  const router = useRouter();
  const {
    emailTemplates,
    pageInfo,
    onGetEmailTemplates,
    onDeleteEmailTemplate,
  } = useEmailTemplate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetchEmailTemplates();
  }, [page, rowsPerPage, searchValue]);

  const fetchEmailTemplates = async () => {
    await onGetEmailTemplates({
      filterBy: {
        search: searchValue,
      },
      cursor: { page: page, size: rowsPerPage },
    });
  };

  const handleClickAction = async (
    value: EmailTemplateType.Data,
    type: 'Edit' | 'View' | 'Delete'
  ) => {
    if (type === 'Delete') {
      await onDeleteEmailTemplate(value.id);
      await fetchEmailTemplates();
    } else if (type === 'Edit') {
      router.push(`/email_templates/edit/${value.id}`);
    } else {
      router.push(`/email_templates/${value.id}`);
    }
  };

  return (
    <DashboardLayout title="EmailTemplate">
      <EmailTemplateHeader
        searchValue={searchValue}
        onSearch={setSearchValue}
      />
      <Divider sx={{ mt: '30px' }} />
      <EmailTemplateTable
        emailTemplateData={emailTemplates}
        onAction={handleClickAction}
        onSort={() => {}}
      />
      <EmailTemplatePagination
        page={page}
        rowsPerPage={rowsPerPage}
        total={pageInfo?.total ?? 0}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
      />
    </DashboardLayout>
  );
};

export default EmailTemplate;
