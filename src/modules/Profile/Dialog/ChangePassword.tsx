import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Box, Stack } from '@mui/material';
import { useAuth } from '@/hooks';
import {
  UIFlexWrapBox,
  UIFlexCenterBox,
  UIInfoTitle,
  UIEditTextField,
  UIDefaultButton,
} from '@/components/UI';
import { AppModal } from '@/components/App';

import { useAppToast } from '@/providers';
import { UserType } from '@/types';
import { ProfileChangePwdSchema } from '@/libs/yupSchema';

type ChangePasswordProps = {
  title: string;
  open: boolean;
  onClose: () => void;
};
const ChangePasswordDialog = ({
  title,
  open,
  onClose,
}: ChangePasswordProps) => {
  const { me, onChangePasswordUser } = useAuth({});
  const appToast = useAppToast();
  const [errorMsg, setErrorMsg] = useState<string>();

  const initValues: UserType.ChangePasswordParam & { confirmPassword: string } =
    {
      oldPassword: '',
      password: '',
      confirmPassword: '',
    };

  const resetValues = () => {
    userFormik.resetForm();
  };

  const userFormik = useFormik({
    initialValues: initValues,
    validationSchema: ProfileChangePwdSchema,
    onSubmit: async (values) => {
      const dataToSave: UserType.ChangePasswordParam = {
        userId: (me as UserType.User)?.id,
        oldPassword: values.oldPassword,
        password: values?.password,
      };
      try {
        await onChangePasswordUser(dataToSave);
        appToast({
          severity: 'success',
          message: 'The password has been updated successfully!',
        });
      } catch (error) {
        console.log(error);
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
    if (JSON.stringify(userFormik.errors) !== '{}') {
      const errorKey = Object.keys(
        userFormik.errors
      )[0] as keyof typeof userFormik.errors;
      setErrorMsg(userFormik.errors[errorKey] as string | undefined);
      return;
    }
    userFormik.handleSubmit();
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
                value={userFormik.values?.oldPassword ?? ''}
                onChange={userFormik.handleChange}
              />
            </UIFlexWrapBox>

            <UIFlexWrapBox sx={{ alignItems: 'center' }}>
              <UIInfoTitle sx={{ width: '130px' }}>New Password:</UIInfoTitle>
              <UIEditTextField
                type="password"
                name="password"
                sx={{ width: '250px' }}
                value={userFormik.values?.password ?? ''}
                onChange={userFormik.handleChange}
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
                value={userFormik.values?.confirmPassword ?? ''}
                onChange={userFormik.handleChange}
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
