import React from 'react';
import { useFormik } from 'formik';
import { Box, Stack, MenuItem } from '@mui/material';
import {
  UIFlexWrapBox,
  UIFlexCenterBox,
  UIInfoTitle,
  UIEditTextField,
  UIDefaultButton,
} from '@/components/UI';
import { AppModal } from '@/components/App';
import { EmailTemplateType } from '@/types';
import { useEmailTemplate, useLocation } from '@/hooks';
import { useAppToast } from '@/providers';

type SendEmailDialogProps = {
  title: string;
  open: boolean;
  onClose: () => void;
  onSendEmail: (value: EmailTemplateType.UserCampaignType) => void;
  isSelectedUser?: boolean;
};

const SendEmailDialog = ({
  title,
  open,
  onClose,
  onSendEmail,
  isSelectedUser,
}: SendEmailDialogProps) => {
  const { locations } = useLocation();
  const { emailTemplates } = useEmailTemplate();
  const appToast = useAppToast();

  const initValues: EmailTemplateType.UserCampaignType = {
    templateId: 0,
    locationId: 0,
  };

  const resetValues = () => {
    sendEmailFormik.resetForm();
  };

  const sendEmailFormik = useFormik({
    initialValues: initValues,
    onSubmit: async (values) => {
      if (isSelectedUser && values.templateId === 0) {
        appToast({
          severity: 'error',
          message: 'Please select Email template',
        });
      } else if (
        !isSelectedUser &&
        (values.locationId === 0 || values.templateId === 0)
      ) {
        appToast({
          severity: 'error',
          message: 'The form should be filled out',
        });
      } else {
        onSendEmail(values);
        onClose();
        resetValues();
      }
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
        onSubmit={sendEmailFormik.handleSubmit}
        sx={{ p: 4 }}
      >
        <UIFlexCenterBox>
          <Stack direction="column" sx={{ width: '100%', gap: '10px' }}>
            <UIFlexWrapBox sx={{ alignItems: 'center' }}>
              <UIInfoTitle sx={{ width: '130px' }}>Locations:</UIInfoTitle>
              <UIEditTextField
                name="locationId"
                value={sendEmailFormik.values?.locationId ?? ''}
                onChange={sendEmailFormik.handleChange}
                select
                sx={{
                  width: '250px',
                }}
                disabled={isSelectedUser}
              >
                {locations?.map((location) => {
                  return (
                    <MenuItem key={location.id} value={location.id}>
                      {location.name}
                    </MenuItem>
                  );
                })}
              </UIEditTextField>
            </UIFlexWrapBox>

            <UIFlexWrapBox sx={{ alignItems: 'center' }}>
              <UIInfoTitle sx={{ width: '130px' }}>
                Email Templates:
              </UIInfoTitle>
              <UIEditTextField
                name="templateId"
                value={sendEmailFormik.values?.templateId ?? ''}
                onChange={sendEmailFormik.handleChange}
                select
                sx={{
                  width: '250px',
                }}
              >
                {emailTemplates?.map((template) => {
                  return (
                    <MenuItem key={template.id} value={template.templateId}>
                      {template.name}
                    </MenuItem>
                  );
                })}
              </UIEditTextField>
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

export default SendEmailDialog;
