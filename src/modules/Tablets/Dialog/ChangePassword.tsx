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
import { useAppToast } from '@/providers';
import { TabletChangePwdSchema } from '@/libs/yupSchema';

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
  const initValues: TabletType.ChangePasswordParam & {
    confirmPassword: string;
  } = {
    tabletId: 0,
    oldPassword: '',
    password: '',
    confirmPassword: '',
  };
  const [errorMsg, setErrorMsg] = useState<string>();

  const resetValues = () => {
    tabletFormik.resetForm();
  };

  const tabletFormik = useFormik({
    initialValues: initValues,
    validationSchema: TabletChangePwdSchema,
    onSubmit: async (values) => {
      try {
        const dataToSave: TabletType.ChangePasswordParam = {
          tabletId: selectedTablet ? selectedTablet.id : 0,
          oldPassword: values.oldPassword,
          password: values?.password,
        };
        await onChangePasswordTablet(dataToSave);
        onClose();
        resetValues();
      } catch (error) {
        console.log(error);
      }
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
      title={title.toUpperCase()}
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
                value={tabletFormik.values?.confirmPassword ?? ''}
                onChange={tabletFormik.handleChange}
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
