import { DashboardLayout } from '@/layouts';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  const router = useRouter();
  const path = router.asPath;
  console.log(path);
  // if (!path.includes('.html')) {
  //   router.replace(path, { query: router.query });
  // }
  // router.push('/users/customers');
  return <DashboardLayout>Dashboard</DashboardLayout>;
};

export default Home;
