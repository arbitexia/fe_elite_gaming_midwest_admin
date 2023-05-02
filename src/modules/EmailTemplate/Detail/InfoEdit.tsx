import React from 'react';
import { useFormik } from 'formik';
import { Box, Divider, Typography, Stack, MenuItem } from '@mui/material';
import {
  UIFlexWrapBox,
  UIFlexSpaceBox,
  UIEditTextField,
  UIDefaultButton,
  UIInfoTitle,
} from '@/components/UI';

import { EmailTemplateType } from '@/types';
import {
  StyledUserInfoTitle,
  StyledUserInfoCard,
  StyledUserInfoCardHeader,
  StyledUserInfoCardContent,
  StyledUserInfoCardStatus,
} from './ui';

import { useAppToast } from '@/providers';
import { emailTemplateStatus, emailTemplateCategories } from '@/constants';

interface EditEmailTemplateProps {
  title: string;
  sendinBlueEmailsOptions?: { id: number; value: string }[];
  emailTemplate?: EmailTemplateType.Data;
  onAction: (value: EmailTemplateType.Body) => void;
}

const EditEmailTemplate = ({
  title,
  emailTemplate,
  sendinBlueEmailsOptions,
  onAction,
}: EditEmailTemplateProps) => {
  const appToast = useAppToast();

  const emailTemplateFormik = useFormik({
    initialValues: emailTemplate ?? {
      id: 0,
      name: '',
      templateId: 0,
      status: '',
      category: '',
    },
    onSubmit: async (values) => {
      onAction({
        input: { ...values, id: emailTemplate ? emailTemplate.id : 0 },
      });
    },
  });

  return (
    <Box component="form" onSubmit={emailTemplateFormik.handleSubmit}>
      <UIFlexSpaceBox>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: 36,
            lineHeight: '54px',
            color: '#89C8C6',
          }}
        >
          {title}
        </Typography>
        <UIDefaultButton
          sx={{ minWidth: '110px', borderRadius: '8px' }}
          type="submit"
        >
          Save
        </UIDefaultButton>
      </UIFlexSpaceBox>
      <Divider sx={{ my: '18px' }} />
      <StyledUserInfoCard>
        <StyledUserInfoCardHeader />
        <StyledUserInfoCardContent>
          <StyledUserInfoCardStatus>
            <Typography
              sx={{
                fontWeight: '400',
                fontSize: '14px',
                lineHeight: '22px',
                color: '#667180',
              }}
            >
              ID #
            </Typography>
          </StyledUserInfoCardStatus>
          <Box flex="1">
            <UIFlexWrapBox sx={{ paddingTop: '20px' }}>
              <Stack direction="column" sx={{ width: '49%', gap: '10px' }}>
                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>Name:</StyledUserInfoTitle>
                  <UIEditTextField
                    name="name"
                    value={emailTemplateFormik.values?.name ?? ''}
                    onChange={emailTemplateFormik.handleChange}
                    sx={{
                      width: '250px',
                    }}
                  />
                </UIFlexWrapBox>
              </Stack>

              <Stack direction="column" sx={{ width: '49%', gap: '10px' }}>
                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>Template ID:</StyledUserInfoTitle>
                  <UIEditTextField
                    name="templateId"
                    onChange={emailTemplateFormik.handleChange}
                    value={emailTemplateFormik.values?.templateId ?? ''}
                    select
                    sx={{
                      width: '250px',
                    }}
                  >
                    {sendinBlueEmailsOptions?.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.value}
                        </MenuItem>
                      );
                    })}
                  </UIEditTextField>
                </UIFlexWrapBox>
              </Stack>

              <Stack direction="column" sx={{ width: '49%', gap: '10px' }}>
                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>Status:</StyledUserInfoTitle>
                  <UIEditTextField
                    name="status"
                    onChange={emailTemplateFormik.handleChange}
                    value={emailTemplateFormik.values?.status ?? ''}
                    select
                    sx={{
                      width: '250px',
                    }}
                  >
                    {emailTemplateStatus.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.value}
                        </MenuItem>
                      );
                    })}
                  </UIEditTextField>
                </UIFlexWrapBox>
              </Stack>

              <Stack direction="column" sx={{ width: '49%', gap: '10px' }}>
                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle>Category:</StyledUserInfoTitle>
                  <UIEditTextField
                    name="category"
                    value={emailTemplateFormik.values?.category ?? ''}
                    onChange={emailTemplateFormik.handleChange}
                    select
                    sx={{
                      width: '250px',
                    }}
                  >
                    {emailTemplateCategories.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.value}
                        </MenuItem>
                      );
                    })}
                  </UIEditTextField>
                </UIFlexWrapBox>
              </Stack>
            </UIFlexWrapBox>
          </Box>
        </StyledUserInfoCardContent>
      </StyledUserInfoCard>
    </Box>
  );
};

export default EditEmailTemplate;
