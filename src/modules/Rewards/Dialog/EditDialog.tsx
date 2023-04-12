import React, { useEffect } from 'react';
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
  const initValues: Reward.Data = {
    id: 0,
    coupon: 10000,
    point: 10000,
  };

  useEffect(() => {
    if (selectedReward) {
      rewardFormik.setFieldValue('point', selectedReward?.point ?? 10000);
      rewardFormik.setFieldValue('coupon', selectedReward?.coupon ?? 10000);
    }
  }, [open]);

  const resetValues = () => {
    rewardFormik.resetForm();
  };

  const rewardFormik = useFormik({
    initialValues: initValues,
    onSubmit: async (values) => {
      const dataToSave: Reward.Data = {
        id: selectedReward?.id ?? 0,
        point: values.point,
        coupon: values.coupon,
      };
      onEdit(dataToSave);
      onClose();
      resetValues();
    },
  });

  return (
    <AppModal
      title={'EDIT'}
      open={open}
      onClose={() => {
        onClose();
        resetValues();
      }}
    >
      <Box component="form" onSubmit={rewardFormik.handleSubmit} sx={{ p: 4 }}>
        <UIFlexCenterBox>
          <Stack direction="column" sx={{ width: '100%', gap: '10px' }}>
            <UIFlexWrapBox sx={{ alignItems: 'center' }}>
              <UIInfoTitle>Point:</UIInfoTitle>
              <UIEditTextField
                type="number"
                name="point"
                sx={{ width: '250px' }}
                value={rewardFormik.values.point}
                onChange={rewardFormik.handleChange}
              />
            </UIFlexWrapBox>
            <UIFlexWrapBox sx={{ alignItems: 'center' }}>
              <UIInfoTitle>Coupon:</UIInfoTitle>
              <UIEditTextField
                type="number"
                name="coupon"
                sx={{ width: '250px' }}
                value={rewardFormik.values.coupon}
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
