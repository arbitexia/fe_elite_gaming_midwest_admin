import React, { useState } from 'react';
import { ChangePasswordDialog, ProfileEdit } from '@/modules/Profile';
import { DashboardLayout } from '@/layouts';
import { useAsset, useAuth } from '@/hooks';
import { UpdateUserParam, UserType } from '@/types';
import { useAppToast } from '@/providers';

const ProfilePage = () => {
  const appToast = useAppToast();
  const { me, onUpdateProfile } = useAuth({});
  const { onCreateAsset } = useAsset();
  const [openModal, setOpenModal] = useState(false);

  const handleEdit = async (value: UpdateUserParam) => {
    try {
      if (value?.uploadPhoto) {
        const assetData = await onCreateAsset(value.uploadPhoto);
        await onUpdateProfile({
          ...value,
          input: { ...value.input, avatar: assetData },
        });
      } else {
        await onUpdateProfile(value);
      }
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
      <ProfileEdit
        user={me as UserType.User}
        onEdit={handleEdit}
        onChangePassword={() => setOpenModal(true)}
      />
      <ChangePasswordDialog
        open={openModal}
        title={'Change password'}
        onClose={() => {
          setOpenModal(false);
        }}
      />
    </DashboardLayout>
  );
};

export default ProfilePage;
