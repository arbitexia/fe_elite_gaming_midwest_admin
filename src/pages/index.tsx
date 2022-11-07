import { Button, Box } from '@mui/material';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  const router = useRouter();
  const handleLogin = () => {
    router.push('/login');
  };
  return (
    <div>
      <Button onClick={handleLogin}>Login</Button>
      <Box>Home Page</Box>
    </div>
  );
};

export default Home;
