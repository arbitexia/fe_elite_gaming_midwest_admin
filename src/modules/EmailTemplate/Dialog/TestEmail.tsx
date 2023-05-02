import React from 'react';
import { useFormik } from 'formik';
import { Box, Stack } from '@mui/material';
import {
  UIFlexWrapBox,
  UIFlexCenterBox,
  UIInfoTitle,
  UIEditTextField,
  UIDefaultButton,
} from '@/components/UI';
import { AppModal } from '@/components/App';
import { EmailTemplateType } from '@/types';

type TestEmailDialogProps = {
  title: string;
  open: boolean;
  onClose: () => void;
  onSend: (value: string) => void;
};
const TestEmailDialog = ({
  title,
  open,
  onClose,
  onSend,
}: TestEmailDialogProps) => {
  const initValues: EmailTemplateType.SendEmail = {
    from: 'Elitegame <rpat.upwork@gmail.com>',
    to: '',
  };

  const resetValues = () => {
    testEmailFormik.resetForm();
  };

  const testEmailFormik = useFormik({
    initialValues: initValues,
    onSubmit: async (values) => {
      onSend(values.to);
      onClose();
      resetValues();
    },
  });

  return (
    <AppModal
      title={title.toUpperCase()}
      open={open}
      onClose={() => {
        onClose();
        resetValues();
      }}
    >
      <Box
        component="form"
        onSubmit={testEmailFormik.handleSubmit}
        sx={{ p: 4 }}
      >
        <UIFlexCenterBox>
          <Stack direction="column" sx={{ width: '100%', gap: '10px' }}>
            <UIFlexWrapBox sx={{ alignItems: 'center' }}>
              <UIInfoTitle sx={{ width: '130px' }}>From:</UIInfoTitle>
              <UIEditTextField
                name="from"
                sx={{ width: '250px' }}
                value={testEmailFormik.values?.from ?? ''}
                onChange={testEmailFormik.handleChange}
                disabled
              />
            </UIFlexWrapBox>

            <UIFlexWrapBox sx={{ alignItems: 'center' }}>
              <UIInfoTitle sx={{ width: '130px' }}>To:</UIInfoTitle>
              <UIEditTextField
                type="to"
                name="to"
                sx={{ width: '250px' }}
                value={testEmailFormik.values?.to ?? ''}
                onChange={testEmailFormik.handleChange}
              />
            </UIFlexWrapBox>
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
            type="submit"
            sx={{ minWidth: '110px', borderRadius: '8px' }}
          >
            Send
          </UIDefaultButton>
        </Box>
      </Box>
    </AppModal>
  );
};

export default TestEmailDialog;
