import { useRouter } from 'next/router';
import { useEmailTemplate } from '@/hooks';
import { DashboardLayout } from '@/layouts';
import { EditEmailTemplate } from '@/modules/EmailTemplate';
import { EmailTemplateType } from '@/types';

const CreateEmailTemplate = () => {
  const router = useRouter();
  const { onCreateEmailTemplate } = useEmailTemplate();
  const handleClickAction = async (value: EmailTemplateType.Body) => {
    try {
      await onCreateEmailTemplate(value);
      router.push('/email_templates');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DashboardLayout title="EmailTemplate">
      <EditEmailTemplate
        title="Create Email Template"
        onAction={handleClickAction}
      />
    </DashboardLayout>
  );
};

export default CreateEmailTemplate;
