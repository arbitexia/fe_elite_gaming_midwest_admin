import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Box, Divider, Typography, Stack, MenuItem } from '@mui/material';
import {
  UIFlexWrapBox,
  UIFlexSpaceBox,
  UIEditTextField,
  UIDefaultButton,
  UIInfoTitle,
} from '@/components/UI';
import { useAsset } from '@/hooks';
import { EmailTemplateType } from '@/types';
import dynamic from 'next/dynamic';
import {
  StyledUserInfoTitle,
  StyledUserInfoCard,
  StyledUserInfoCardHeader,
  StyledUserInfoCardContent,
  StyledUserInfoCardStatus,
} from './ui';
import { convertMBtoBytes } from '@/libs/data-helper';
import { useAppToast } from '@/providers';
import { emailTemplateStatus, emailTemplateType } from '@/_mock/emailTemplate';
import { formats, modules } from '@/constants';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(
  () => {
    return import('react-quill');
  },
  { loading: () => null, ssr: false }
);

interface EditEmailTemplateProps {
  title: string;
  emailTemplate?: EmailTemplateType.Data;
  onAction: (value: EmailTemplateType.Body) => void;
}

const EditEmailTemplate = ({
  title,
  emailTemplate,
  onAction,
}: EditEmailTemplateProps) => {
  const [uploadPhoto, setUploadPhoto] = useState<File>();
  const [selectedFile, setSelectedFile] = useState<string>();
  const appToast = useAppToast();

  const { onCreateAsset } = useAsset();

  const [emailText, setEmailText] = useState('');

  const emailTemplateFormik = useFormik({
    initialValues: emailTemplate ?? {
      id: 0,
      name: '',
      status: '',
      type: '',
      subject: '',
      htmlBody: '',
    },
    onSubmit: async (values) => {
      onAction({
        input: { ...values, id: emailTemplate ? emailTemplate.id : 0 },
      });
    },
  });

  useEffect(() => {
    if (emailTemplateFormik.values.htmlBody) {
      setEmailText(emailTemplateFormik.values.htmlBody);
    }
  }, [emailTemplateFormik.values.htmlBody]);

  // const onAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   const reader = new FileReader();
  //   const file = e.target.files ? e.target.files[0] : null;
  //   if (!file) return;
  //   // Restrict user to upload file less than 3.1MB
  //   if (file.size > convertMBtoBytes(3.1)) {
  //     appToast('error', 'File size is too large');
  //     return;
  //   }
  //   reader.onloadend = async () => {
  //     setUploadPhoto(file);
  //     setSelectedFile(reader.result as string);
  //   };
  //   reader.readAsDataURL(file);
  // };
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
                  <StyledUserInfoTitle>Subject:</StyledUserInfoTitle>
                  <UIEditTextField
                    name="subject"
                    value={emailTemplateFormik.values?.subject ?? ''}
                    onChange={emailTemplateFormik.handleChange}
                    sx={{
                      width: '250px',
                    }}
                  />
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
                  <StyledUserInfoTitle>Type:</StyledUserInfoTitle>
                  <UIEditTextField
                    name="type"
                    value={emailTemplateFormik.values?.type ?? ''}
                    onChange={emailTemplateFormik.handleChange}
                    select
                    sx={{
                      width: '250px',
                    }}
                  >
                    {emailTemplateType.map((item) => {
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

            <Box
              sx={{
                width: '100%',
                height: '350px',
                paddingTop: '20px',
                '.quill': { height: '250px', marginTop: '20px' },
              }}
            >
              <UIInfoTitle sx={{ width: 'auto' }}>Email content:</UIInfoTitle>
              <ReactQuill
                theme="snow"
                value={emailText}
                onChange={(data) => {
                  setEmailText(data);
                  emailTemplateFormik.setFieldValue('htmlBody', data);
                }}
                modules={modules}
                formats={formats}
              />
            </Box>
          </Box>
        </StyledUserInfoCardContent>
      </StyledUserInfoCard>
    </Box>
  );
};

export default EditEmailTemplate;
