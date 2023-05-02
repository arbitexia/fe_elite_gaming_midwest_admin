import { Typography, Stack, Box } from '@mui/material';
import {
  UICardBox,
  UIFlexWrapBox,
  UIInfoTitle,
  UIInfoValue,
} from '@/components/UI';
import { EmailTemplateType } from '@/types';

type EmailTemplateDetailInfo = {
  emailTemplate: EmailTemplateType.Data;
};

const EmailTemplateDetailInfo = ({
  emailTemplate,
}: EmailTemplateDetailInfo) => {
  return (
    <UICardBox>
      <Typography
        sx={{
          fontWeight: '600',
          fontSize: '18px',
          lineHeight: '17px',
          color: '#222B35',
        }}
      >
        Information:
      </Typography>
      <UIFlexWrapBox sx={{ paddingTop: '20px' }}>
        <Stack direction="column" sx={{ flex: '1 1 0', gap: '18px' }}>
          <UIFlexWrapBox>
            <UIInfoTitle>Name:</UIInfoTitle>
            <UIInfoValue>{emailTemplate.name}</UIInfoValue>
          </UIFlexWrapBox>
          <UIFlexWrapBox>
            <UIInfoTitle>Category:</UIInfoTitle>
            <UIInfoValue>{emailTemplate.category}</UIInfoValue>
          </UIFlexWrapBox>
          <UIFlexWrapBox>
            <UIInfoTitle>Subject:</UIInfoTitle>
            <UIInfoValue>{emailTemplate?.subject}</UIInfoValue>
          </UIFlexWrapBox>
        </Stack>
        <Stack direction="column" sx={{ flex: '1 1 0', gap: '18px' }}>
          <UIFlexWrapBox>
            <UIInfoTitle>Status:</UIInfoTitle>
            <UIInfoValue>{emailTemplate?.status}</UIInfoValue>
          </UIFlexWrapBox>
          <UIFlexWrapBox>
            <UIInfoTitle sx={{ width: 'auto' }}>Template Id:</UIInfoTitle>
            <UIInfoValue>{emailTemplate.templateId}</UIInfoValue>
          </UIFlexWrapBox>
        </Stack>
      </UIFlexWrapBox>
      <Box
        sx={{
          width: '100%',
          paddingTop: '20px',
        }}
      >
        <UIInfoTitle>Content:</UIInfoTitle>
        <Box
          dangerouslySetInnerHTML={{ __html: emailTemplate?.htmlBody ?? '' }}
        ></Box>
      </Box>
    </UICardBox>
  );
};

export default EmailTemplateDetailInfo;
