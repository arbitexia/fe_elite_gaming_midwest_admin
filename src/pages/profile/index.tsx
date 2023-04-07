import { Stack } from '@mui/material';
import { ProfileEdit } from '@/modules/Profile';
import { DashboardLayout } from '@/layouts';

import { profileData } from '@/_mock/users';
import { useAuth } from '@/hooks';
import { UpdateUserParam, UserType } from '@/types';
import { useAppToast } from '@/providers';

const ProfilePage = () => {
  const appToast = useAppToast();
  const { me } = useAuth({});
  const { onUpdateProfile } = useAuth({});
  const handleEdit = async (value: UpdateUserParam) => {
    try {
      await onUpdateProfile(value);
      appToast({
        severity: 'success',
        message: 'The profile has been updated!',
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DashboardLayout title="Profile">
      {profileData && (
        <Stack direction="column" spacing={2.5} paddingTop={4}>
          <ProfileEdit user={me as UserType.User} onEdit={handleEdit} />
        </Stack>
      )}
    </DashboardLayout>
  );
};

export default ProfilePage;
