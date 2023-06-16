import { useEffect } from 'react';
import { UserDetailInfoEditCard } from '@/modules/Users';
import { DashboardLayout } from '@/layouts';
import { UserType } from '@/types';
import { useAuth, useLocation } from '@/hooks';
import { UserRoleIDEnum } from '@/constants';

const UsersDetailPage = () => {
  const { locations, onGetLocations } = useLocation();
  const { me } = useAuth();
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
    if (!locations) {
      onGetLocations({
        filterBy: {
          search: '',
          ...((me as UserType.User).roleId === UserRoleIDEnum.ADMIN && {
            userId: Number((me as UserType.User).id),
          }),
        },
      });
    }
  }, [locations]);
  return (
    <DashboardLayout title="Users">
      <UserDetailInfoEditCard user={initUserData} type="create" />
    </DashboardLayout>
  );
};

export default UsersDetailPage;
