import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Box, Stack } from '@mui/material';
import { useTablet } from '@/hooks';
import {
  UIFlexWrapBox,
  UIFlexCenterBox,
  UIInfoTitle,
  UIEditTextField,
  UIDefaultButton,
} from '@/components/UI';
import { AppModal } from '@/components/App';
import { TabletType } from '@/types';
import { UserStatus } from '@/constants';
import { useAppToast } from '@/providers';

type ChangePasswordProps = {
  selectedTablet?: TabletType.Data;
  title: string;
  open: boolean;
  onClose: () => void;
};
const ChangePasswordDialog = ({
  selectedTablet,
  title,
  open,
  onClose,
}: ChangePasswordProps) => {
  const { onChangePasswordTablet } = useTablet();
  const appToast = useAppToast();
  const [confirmPassword, setConfirmPassword] = useState('');

  const initValues: TabletType.ChangePasswordParam = {
    tabletId: 0,
    oldPassword: '',
    password: '',
  };

  const resetValues = () => {
    tabletFormik.resetForm();
    setConfirmPassword('');
  };

  const tabletFormik = useFormik({
    initialValues: initValues,
    onSubmit: async (values) => {
      if (!values?.oldPassword) {
        appToast({
          severity: 'error',
          message: 'The old password is required!',
        });
        return;
      }
      if (!values?.password && !selectedTablet) {
        appToast({
          severity: 'error',
          message: 'The password is required!',
        });
        return;
      }
      if (values?.password !== confirmPassword && !selectedTablet) {
        appToast({
          severity: 'error',
          message: 'Passwords do not match! Please try again!',
        });
        return;
      }
      const dataToSave: TabletType.ChangePasswordParam = {
        tabletId: selectedTablet ? selectedTablet.id : 0,
        oldPassword: values.oldPassword,
        password: values?.password,
      };
      onChangePasswordTablet(dataToSave);
      onClose();
      resetValues();
    },
  });

  return (
    <AppModal
      title={title.toUpperCase()}
      open={open}
      onClose={() => {
        onClose();
        resetValues();
      }}
    >
      <Box component="form" onSubmit={tabletFormik.handleSubmit} sx={{ p: 4 }}>
        <UIFlexCenterBox>
          <Stack direction="column" sx={{ width: '100%', gap: '10px' }}>
            <UIFlexWrapBox sx={{ alignItems: 'center' }}>
              <UIInfoTitle sx={{ width: '130px' }}>Old Password:</UIInfoTitle>
              <UIEditTextField
                name="oldPassword"
                sx={{ width: '250px' }}
                value={tabletFormik.values?.oldPassword ?? ''}
                onChange={tabletFormik.handleChange}
              />
            </UIFlexWrapBox>

            <UIFlexWrapBox sx={{ alignItems: 'center' }}>
              <UIInfoTitle sx={{ width: '130px' }}>New Password:</UIInfoTitle>
              <UIEditTextField
                type="password"
                name="password"
                sx={{ width: '250px' }}
                value={tabletFormik.values?.password ?? ''}
                onChange={tabletFormik.handleChange}
              />
            </UIFlexWrapBox>
            <UIFlexWrapBox sx={{ alignItems: 'center' }}>
              <UIInfoTitle sx={{ width: '130px' }}>
                Confirm Password:
              </UIInfoTitle>
              <UIEditTextField
                type="password"
                name="confirmPassword"
                sx={{ width: '250px' }}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </UIFlexWrapBox>
          </Stack>
        </UIFlexCenterBox>
        <Box
          sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, gap: 4 }}
        >
          <UIDefaultButton
            autoFocus
            onClick={() => {
              onClose();
              resetValues();
            }}
            sx={{
              minWidth: '110px',
              borderRadius: '8px',
              background: 'rgba(0, 0, 0, 0.2)',
            }}
          >
            Cancel
          </UIDefaultButton>
          <UIDefaultButton
            type="submit"
            sx={{ minWidth: '110px', borderRadius: '8px' }}
          >
            Save
          </UIDefaultButton>
        </Box>
      </Box>
    </AppModal>
  );
};

export default ChangePasswordDialog;
