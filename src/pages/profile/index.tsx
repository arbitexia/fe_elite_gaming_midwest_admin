import { Stack } from '@mui/material';
import { ProfileEdit } from '@/modules/Profile';
import { DashboardLayout } from '@/layouts';

import { profileData } from '@/_mock/users';

const ProfilePage = () => {
  return (
    <DashboardLayout title="Users">
      {profileData && (
        <Stack direction="column" spacing={2.5} paddingTop={4}>
          <ProfileEdit user={profileData} />
        </Stack>
      )}
    </DashboardLayout>
  );
};

export default ProfilePage;
