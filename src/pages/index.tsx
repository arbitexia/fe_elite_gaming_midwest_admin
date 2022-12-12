import { DashboardLayout } from '@/layouts';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  const router = useRouter();
  router.push('/users/customers');
  return <DashboardLayout>Dashboard</DashboardLayout>;
};

export default Home;
