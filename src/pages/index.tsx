import { DashboardLayout } from '@/layouts';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  const router = useRouter();
  console.log(router);
  if (router.pathname === '/') {
    // router.replace('/users/customers');
    return <DashboardLayout>Dashboard</DashboardLayout>;
  } else {
    // router.replace(router.asPath);
    return <></>;
  }
};

export default Home;
