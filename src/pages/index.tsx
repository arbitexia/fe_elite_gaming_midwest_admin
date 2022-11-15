import { Button, Box } from '@mui/material';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import { AppLayout } from '@/layouts';

const Home: NextPage = () => {
  const router = useRouter();
  const handleLogin = () => {
    router.push('/login');
  };
  return (
    <AppLayout>
      <Button onClick={handleLogin}>Login*************************</Button>
    </AppLayout>
  );
};

export default Home;
