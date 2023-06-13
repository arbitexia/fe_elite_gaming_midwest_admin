import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Box, Stack } from '@mui/material';
import {
  UIFlexWrapBox,
  UIFlexCenterBox,
  UIInfoTitle,
  UIEditTextField,
  UIDefaultButton,
} from '@/components/UI';
import { AppModal } from '@/components/App';
import { Reward } from '@/types';
import { RewardSchema } from '@/libs/yupSchema';
import { useAppToast } from '@/providers';

type RewardEditDialogProps = {
  selectedReward?: Reward.Data;
  open: boolean;
  onClose: () => void;
  onEdit: (value: Reward.Data) => void;
};
const RewardEditDialog = ({
  selectedReward,
  open,
  onClose,
  onEdit,
}: RewardEditDialogProps) => {
  const appToast = useAppToast();
  const [errorMsg, setErrorMsg] = useState<string>();
  const initValues: Reward.Data = {
    id: 0,
    coupon: 10000,
    point: 10000,
    pointThreshold: 0,
    couponThreshold: 0,
  };

  useEffect(() => {
    if (selectedReward) {
      rewardFormik.setFieldValue('point', selectedReward?.point ?? 10000);
      rewardFormik.setFieldValue('coupon', selectedReward?.coupon ?? 10000);
      rewardFormik.setFieldValue(
        'pointThreshold',
        selectedReward?.pointThreshold ?? 0
      );
      rewardFormik.setFieldValue(
        'couponThreshold',
        selectedReward?.couponThreshold ?? 0
      );
    }
  }, [open]);

  const resetValues = () => {
    rewardFormik.resetForm();
  };

  const rewardFormik = useFormik({
    initialValues: initValues,
    validationSchema: RewardSchema,
    onSubmit: async (values) => {
      const dataToSave: Reward.Data = {
        ...values,
        id: selectedReward?.id ?? 0,
      };
      onEdit(dataToSave);
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
    if (JSON.stringify(rewardFormik.errors) !== '{}') {
      const errorKey = Object.keys(
        rewardFormik.errors
      )[0] as keyof typeof rewardFormik.errors;
      setErrorMsg(rewardFormik.errors[errorKey] as string | undefined);
      return;
    }
    rewardFormik.handleSubmit();
  };
  return (
    <AppModal
      title={'EDIT'}
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
              <UIInfoTitle sx={{ width: '120px' }}>Point:</UIInfoTitle>
              <UIEditTextField
                type="number"
                name="point"
                sx={{ width: '250px' }}
                value={rewardFormik.values.point}
                onChange={rewardFormik.handleChange}
              />
            </UIFlexWrapBox>
            <UIFlexWrapBox sx={{ alignItems: 'center' }}>
              <UIInfoTitle sx={{ width: '120px' }}>
                Point threshold:
              </UIInfoTitle>
              <UIEditTextField
                type="number"
                name="pointThreshold"
                sx={{ width: '250px' }}
                value={rewardFormik.values.pointThreshold}
                onChange={rewardFormik.handleChange}
              />
            </UIFlexWrapBox>
            <UIFlexWrapBox sx={{ alignItems: 'center' }}>
              <UIInfoTitle sx={{ width: '120px' }}>Coupon:</UIInfoTitle>
              <UIEditTextField
                type="number"
                name="coupon"
                sx={{ width: '250px' }}
                value={rewardFormik.values.coupon}
                onChange={rewardFormik.handleChange}
              />
            </UIFlexWrapBox>
            <UIFlexWrapBox sx={{ alignItems: 'center' }}>
              <UIInfoTitle sx={{ width: '120px' }}>
                Coupon threshold:
              </UIInfoTitle>
              <UIEditTextField
                type="number"
                name="couponThreshold"
                sx={{ width: '250px' }}
                value={rewardFormik.values.couponThreshold}
                onChange={rewardFormik.handleChange}
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

export default RewardEditDialog;
