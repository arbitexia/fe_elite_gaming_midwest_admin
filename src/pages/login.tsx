import { useRouter } from 'next/router';
import { Box, Button } from '@mui/material';
import { AppLayout } from '@/layouts';
import { useTranslation, LanguageSwitcher } from 'next-export-i18n';

const LoginPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <AppLayout>
      <LanguageSwitcher lang="es">
        <Button variant="outlined">es</Button>
      </LanguageSwitcher>{' '}
      |{' '}
      <LanguageSwitcher lang="en">
        <Button variant="outlined">en</Button>
      </LanguageSwitcher>
      <Button
        variant="outlined"
        onClick={() => {
          router.push('/');
        }}
      >
        Home
      </Button>
      <Box>{t('login.login')}</Box>
    </AppLayout>
  );
};

export default LoginPage;
