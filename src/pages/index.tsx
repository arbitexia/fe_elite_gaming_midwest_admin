import { DashboardLayout } from '@/layouts';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  const router = useRouter();
  const path = router.asPath;
  console.log(router);
  if (path === '/') {
    router.replace('/users/customers');
    return <DashboardLayout>Dashboard</DashboardLayout>;
  } else {
    router.replace(path);
    return <></>;
  }
};

export default Home;
