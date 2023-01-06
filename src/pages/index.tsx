import { DashboardLayout } from '@/layouts';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  const router = useRouter();
  const path = router.asPath;
  console.log(path);
  if (path === '/') return <DashboardLayout>Dashboard</DashboardLayout>;
  else {
    router.push(path);
    return <></>;
  }
};

export default Home;
