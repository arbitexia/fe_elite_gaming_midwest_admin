import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Box, Divider, Typography, Stack, MenuItem } from '@mui/material';
import {
  UIFlexWrapBox,
  UIFlexSpaceBox,
  UIEditTextField,
  UIDefaultButton,
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
import { useEmailTemplate } from '@/hooks';

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
  const { sendinEmails, emailTemplates } = useEmailTemplate();
  const [selectedTemplateId, setSelectedTemplateId] = useState<number>();

  const emailTemplateFormik = useFormik({
    initialValues: emailTemplate ?? {
      id: 0,
      name: '',
      templateId: 0,
      status: '',
      category: '',
    },
    onSubmit: async (values) => {
      if (
        values.category !== 'OTHER' &&
        emailTemplates?.some((obj) => obj.category === values.category)
      ) {
        appToast({
          severity: 'error',
          message: 'The template has already been created.',
        });
        return;
      }
      if (
        values.name &&
        values.status &&
        values.templateId &&
        values.category
      ) {
        onAction({
          input: { ...values, id: emailTemplate ? emailTemplate.id : 0 },
        });
      } else {
        appToast({
          severity: 'error',
          message: 'The form should be filled out.',
        });
      }
    },
  });

  useEffect(() => {
    if (emailTemplate) {
      setSelectedTemplateId(emailTemplate.templateId);
    }
  }, [emailTemplate]);

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
                    onChange={(e) => {
                      emailTemplateFormik.handleChange(e);
                      setSelectedTemplateId(Number(e.target.value));
                    }}
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
        <Box
          dangerouslySetInnerHTML={{
            __html:
              sendinEmails?.find((obj) => obj.id === selectedTemplateId)
                ?.htmlContent ?? '',
          }}
          sx={{ my: 4 }}
        ></Box>
      </StyledUserInfoCard>
    </Box>
  );
};

export default EditEmailTemplate;
