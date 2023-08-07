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
import { SMSSchema } from '@/libs/yupSchema';

type SendSMSDialogProps = {
  title: string;
  open: boolean;
  onClose: () => void;
  onSendSMS: (value: { text: string }) => void;
};

const sendSMSDialog = ({
  title,
  open,
  onClose,
  onSendSMS,
}: SendSMSDialogProps) => {
  const [errMsg, setErrMsg] = useState<string>();
  const appToast = useAppToast();

  const initValues: { text: string } = {
    text: '',
  };

  const resetValues = () => {
    smsFormik.resetForm();
  };

  const smsFormik = useFormik({
    initialValues: initValues,
    validationSchema: SMSSchema,
    onSubmit: async (values) => {
      onSendSMS(values);
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
    if (JSON.stringify(smsFormik.errors) !== '{}') {
      const errorKey = Object.keys(
        smsFormik.errors
      )[0] as keyof typeof smsFormik.errors;
      setErrMsg(smsFormik.errors[errorKey] as string | undefined);
      return;
    }
    smsFormik.handleSubmit();
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
          <Box sx={{ minWidth: '420px' }}>
            <UIInfoTitle sx={{ mb: 1 }}>Content:</UIInfoTitle>
            <UIEditTextField
              name="text"
              value={smsFormik.values.text}
              onChange={smsFormik.handleChange}
              fullWidth
              multiline
              rows={6}
            />
          </Box>
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

export default sendSMSDialog;
