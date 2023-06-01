import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Box, Stack, MenuItem, Divider } from '@mui/material';
import {
  UIFlexWrapBox,
  UIFlexCenterBox,
  UIInfoTitle,
  UIEditTextField,
  UIDefaultButton,
} from '@/components/UI';
import { AppModal } from '@/components/App';
import { EmailTemplateType } from '@/types';
import { useEmailTemplate } from '@/hooks';
import { useAppToast } from '@/providers';
import { FollowUpSchema } from '@/libs/yupSchema';

type FollowUpEmailDialogProps = {
  title: string;
  open: boolean;
  onClose: () => void;
  onFollowUpEmail: (value: EmailTemplateType.FollowUpEmailType) => void;
};

const FollowUpEmailDialog = ({
  title,
  open,
  onClose,
  onFollowUpEmail,
}: FollowUpEmailDialogProps) => {
  const { emailTemplates } = useEmailTemplate();
  const [errMsg, setErrMsg] = useState<string>();
  const appToast = useAppToast();

  const initValues: EmailTemplateType.FollowUpEmailType = {
    templateId: 0,
    from: '',
    subject: '',
    content: '',
  };

  const resetValues = () => {
    followupFormik.resetForm();
  };

  const followupFormik = useFormik({
    initialValues: initValues,
    validationSchema: FollowUpSchema,
    onSubmit: async (values) => {
      onFollowUpEmail(values);
      onClose();
      resetValues();
    },
  });

  useEffect(() => {
    if (errMsg) {
      appToast({
        severity: 'error',
        message: errMsg,
      });
      setErrMsg(undefined);
    }
  }, [errMsg]);

  const handleClickSend = () => {
    if (followupFormik.values.templateId > 0) {
      onFollowUpEmail(followupFormik.values);
      onClose();
      resetValues();
      return;
    }
    if (JSON.stringify(followupFormik.errors) !== '{}') {
      const errorKey = Object.keys(
        followupFormik.errors
      )[0] as keyof typeof followupFormik.errors;
      setErrMsg(followupFormik.errors[errorKey] as string | undefined);
      return;
    }
    followupFormik.handleSubmit();
  };

  return (
    <AppModal
      title={title.toUpperCase()}
      open={open}
      onClose={() => {
        onClose();
        resetValues();
      }}
    >
      <Box sx={{ p: 4 }}>
        <UIFlexCenterBox>
          <Stack direction="column" sx={{ width: '100%', gap: '10px' }}>
            <UIFlexWrapBox sx={{ alignItems: 'center' }}>
              <UIInfoTitle sx={{ width: '130px' }}>
                Email Templates:
              </UIInfoTitle>
              <UIEditTextField
                name="templateId"
                value={followupFormik.values?.templateId ?? ''}
                onChange={followupFormik.handleChange}
                select
                sx={{
                  width: '250px',
                }}
              >
                <MenuItem key={0} value={0}>
                  None
                </MenuItem>
                {emailTemplates?.map((template) => {
                  return (
                    <MenuItem key={template.id} value={template.templateId}>
                      {template.name}
                    </MenuItem>
                  );
                })}
              </UIEditTextField>
            </UIFlexWrapBox>
            <Divider />

            <UIFlexWrapBox sx={{ alignItems: 'center' }}>
              <UIInfoTitle sx={{ width: '130px' }}>From:</UIInfoTitle>
              <UIEditTextField
                name="from"
                value={followupFormik.values.from}
                onChange={followupFormik.handleChange}
                sx={{ width: '250px' }}
                disabled={
                  followupFormik.values?.templateId === 0 ? false : true
                }
              />
            </UIFlexWrapBox>
            <UIFlexWrapBox sx={{ alignItems: 'center' }}>
              <UIInfoTitle sx={{ width: '130px' }}>Subject:</UIInfoTitle>
              <UIEditTextField
                name="subject"
                value={followupFormik.values.subject}
                onChange={followupFormik.handleChange}
                sx={{ width: '250px' }}
                disabled={
                  followupFormik.values?.templateId === 0 ? false : true
                }
              />
            </UIFlexWrapBox>
            <Box>
              <UIInfoTitle sx={{ mb: 1 }}>Content:</UIInfoTitle>
              <UIEditTextField
                name="content"
                value={followupFormik.values.content}
                onChange={followupFormik.handleChange}
                fullWidth
                multiline
                rows={6}
                disabled={
                  followupFormik.values?.templateId === 0 ? false : true
                }
              />
            </Box>
          </Stack>
        </UIFlexCenterBox>
        <Box
          sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, gap: 4 }}
        >
          <UIDefaultButton
            autoFocus
            onClick={() => {
              onClose();
              resetValues();
            }}
            sx={{
              minWidth: '110px',
              borderRadius: '8px',
              background: 'rgba(0, 0, 0, 0.2)',
            }}
          >
            Cancel
          </UIDefaultButton>
          <UIDefaultButton
            sx={{ minWidth: '110px', borderRadius: '8px' }}
            onClick={handleClickSend}
          >
            Send
          </UIDefaultButton>
        </Box>
      </Box>
    </AppModal>
  );
};

export default FollowUpEmailDialog;
