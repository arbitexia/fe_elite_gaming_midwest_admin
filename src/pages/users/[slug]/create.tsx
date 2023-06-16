import { useEffect } from 'react';
import { UserDetailInfoEditCard } from '@/modules/Users';
import { DashboardLayout } from '@/layouts';
import { UserType } from '@/types';
import { useLocation } from '@/hooks';

const UsersDetailPage = () => {
  const { onGetLocations } = useLocation();
  const initUserData: UserType.User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    address: {
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipcode: '',
      country: '',
    },
    locationId: 0,
    phone: '',
    birthday: '',
    createdAt: '',
  };
  useEffect(() => {
    onGetLocations({ filterBy: { search: '' } });
  }, []);
  return (
    <DashboardLayout title="Users">
      <UserDetailInfoEditCard user={initUserData} type="create" />
    </DashboardLayout>
  );
};

export default UsersDetailPage;
