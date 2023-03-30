import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Box, Stack, MenuItem } from '@mui/material';
import { useLocation, useTablet } from '@/hooks';
import {
  UIFlexWrapBox,
  UIFlexCenterBox,
  UIInfoTitle,
  UIEditTextField,
  UIDefaultButton,
} from '@/components/UI';
import { AppModal } from '@/components/App';
import { userStatus } from '@/_mock/users';
import { TabletType } from '@/types';
import { UserStatus } from '@/constants';
import { useAppToast } from '@/providers';

type TabletDialogProps = {
  selectedTablet?: TabletType.Data;
  actionType: 'create' | 'edit';
  open: boolean;
  onClose: () => void;
};
const TabletDialog = ({
  selectedTablet,
  actionType,
  open,
  onClose,
}: TabletDialogProps) => {
  const { locations } = useLocation();
  const { onCreateTablet, onUpdateTablet } = useTablet();

  const appToast = useAppToast();

  const [confirmPassword, setConfirmPassword] = useState('');

  const initValues: TabletType.Data = {
    id: 0,
    name: '',
    status: undefined,
    locationId: undefined,
    password: '',
  };

  useEffect(() => {
    if (selectedTablet) {
      tabletFormik.setFieldValue('name', selectedTablet?.name ?? '');
      tabletFormik.setFieldValue('status', selectedTablet?.status ?? undefined);
      tabletFormik.setFieldValue(
        'locationId',
        selectedTablet?.locationId ?? undefined
      );
    }
  }, [open]);

  const resetValues = () => {
    tabletFormik.resetForm();
    setConfirmPassword('');
  };

  const tabletFormik = useFormik({
    initialValues: initValues,
    onSubmit: async (values) => {
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
      const dataToSave: TabletType.Input = {
        input: {
          id: selectedTablet ? selectedTablet.id : 0,
          name: values.name,
          status: values?.status ?? UserStatus.ACTIVATED,
          locationId: values?.locationId ?? 0,
          ...(!selectedTablet && { password: values.password }),
        },
      };
      if (selectedTablet) {
        onUpdateTablet(dataToSave);
      } else {
        onCreateTablet(dataToSave);
      }
      onClose();
      resetValues();
    },
  });

  return (
    <AppModal
      title={actionType.toUpperCase()}
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
              <UIInfoTitle>Name:</UIInfoTitle>
              <UIEditTextField
                name="name"
                sx={{ width: '250px' }}
                value={tabletFormik.values.name}
                onChange={tabletFormik.handleChange}
              />
            </UIFlexWrapBox>
            <UIFlexWrapBox sx={{ alignItems: 'center' }}>
              <UIInfoTitle>Locations:</UIInfoTitle>
              <UIEditTextField
                name="locationId"
                value={tabletFormik.values?.locationId ?? ''}
                onChange={tabletFormik.handleChange}
                sx={{ width: '250px' }}
                select
              >
                {locations?.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </UIEditTextField>
            </UIFlexWrapBox>
            <UIFlexWrapBox sx={{ alignItems: 'center' }}>
              <UIInfoTitle>Status:</UIInfoTitle>
              <UIEditTextField
                name="status"
                onChange={tabletFormik.handleChange}
                value={tabletFormik.values?.status ?? ''}
                select
                sx={{
                  width: '250px',
                }}
              >
                {userStatus.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.value}
                    </MenuItem>
                  );
                })}
              </UIEditTextField>
            </UIFlexWrapBox>
            {!selectedTablet && (
              <>
                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <UIInfoTitle>Password:</UIInfoTitle>
                  <UIEditTextField
                    type="password"
                    name="password"
                    sx={{ width: '250px' }}
                    value={tabletFormik.values.password}
                    onChange={tabletFormik.handleChange}
                  />
                </UIFlexWrapBox>
                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <UIInfoTitle>Confirm Password:</UIInfoTitle>
                  <UIEditTextField
                    type="password"
                    name="confirmPassword"
                    sx={{ width: '250px' }}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </UIFlexWrapBox>
              </>
            )}
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

export default TabletDialog;
