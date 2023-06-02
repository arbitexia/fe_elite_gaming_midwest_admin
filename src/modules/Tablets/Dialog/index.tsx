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
import { LocationStatus } from '@/constants/enum';
import { TabletCreateSchema, TabletEditSchema } from '@/libs/yupSchema';

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
  const [errorMsg, setErrorMsg] = useState<string>();

  const initValues: TabletType.Data & { confirmPassword: string } = {
    id: 0,
    name: '',
    status: undefined,
    locationId: undefined,
    password: '',
    confirmPassword: '',
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
  };

  const tabletFormik = useFormik({
    initialValues: initValues,
    validationSchema: selectedTablet ? TabletEditSchema : TabletCreateSchema,
    onSubmit: async (values) => {
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

  useEffect(() => {
    if (errorMsg) {
      appToast({
        severity: 'error',
        message: errorMsg,
      });
      setErrorMsg(undefined);
    }
  }, [errorMsg]);

  const handleClickSave = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (JSON.stringify(tabletFormik.errors) !== '{}') {
      const errorKey = Object.keys(
        tabletFormik.errors
      )[0] as keyof typeof tabletFormik.errors;
      setErrorMsg(tabletFormik.errors[errorKey] as string | undefined);
      return;
    }
    tabletFormik.handleSubmit();
  };

  return (
    <AppModal
      title={actionType.toUpperCase()}
      open={open}
      onClose={() => {
        onClose();
        resetValues();
      }}
    >
      <Box component="form" onSubmit={handleClickSave} sx={{ p: 4 }}>
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
                {locations
                  ?.filter((obj) => obj.status === LocationStatus.OPEN)
                  ?.map((item) => {
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
                    value={tabletFormik.values.confirmPassword}
                    onChange={tabletFormik.handleChange}
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
