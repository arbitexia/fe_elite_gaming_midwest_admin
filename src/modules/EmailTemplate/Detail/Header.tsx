import { useRouter } from 'next/router';
import { Typography } from '@mui/material';
import { Edit, Send } from '@mui/icons-material';
import { UIFlexSpaceBox, UIActionButton, UIFlexWrapBox } from '@/components/UI';

export type EmailTemplateDetailHeaderProps = {
  onAction: (id: number) => void;
};

const EmailTemplateDetailHeader = ({
  onAction,
}: EmailTemplateDetailHeaderProps) => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <UIFlexSpaceBox sx={{ alignItems: 'center', gap: '12px' }}>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: 36,
          lineHeight: '54px',
          color: '#89C8C6',
        }}
      >
        Details
      </Typography>
      <UIFlexWrapBox>
        <UIActionButton
          icon={<Send />}
          color="#28B446 "
          title="Test Email"
          handleClick={() => onAction(Number(id))}
        />
        <UIActionButton
          icon={<Edit />}
          color="#89C8C6"
          title="Edit"
          handleClick={() => {
            router.push(`/email_templates/edit/${id}`);
          }}
        />
      </UIFlexWrapBox>
    </UIFlexSpaceBox>
  );
};

export default EmailTemplateDetailHeader;
