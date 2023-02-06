import { useState } from 'react';
import {
  UIFlexSpaceBox,
  UIDefaultButton,
  UIActionButton,
  UIFlexWrapBox,
} from '@/components/UI';
import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useProduct } from '@/hooks';

export type RewardDetailHeaderProps = {
  name: string;
  isEditable: boolean;
};

const RewardDetailHeader = ({ name, isEditable }: RewardDetailHeaderProps) => {
  const router = useRouter();
  const { id } = router.query;
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { onDeleteProduct } = useProduct();
  const handleCancel = () => {
    setOpenDeleteModal(false);
  };
  const handleOk = async () => {
    setOpenDeleteModal(false);
    await onDeleteProduct(parseInt(id as string));
    router.push(`/rewards`);
  };
  return (
    <UIFlexSpaceBox
      sx={{ mt: '35px', mb: '30px', alignItems: 'center', gap: '12px' }}
    >
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: 24,
          lineHeight: '17px',
          color: '#06251F',
        }}
      >
        {name}
      </Typography>
      <UIFlexWrapBox>
        {isEditable ? (
          <UIDefaultButton type="submit">Save</UIDefaultButton>
        ) : (
          <>
            <UIActionButton
              icon={<Edit />}
              color="#28B446"
              title="Edit"
              handleClick={() => {
                router.push(`/rewards/edit/${id}`);
              }}
            />
            <UIActionButton
              icon={<Delete />}
              color="#F14336"
              title="Delete"
              handleClick={() => setOpenDeleteModal(true)}
            />
          </>
        )}
      </UIFlexWrapBox>
      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        maxWidth="xs"
        open={openDeleteModal}
      >
        <DialogTitle>Delete Reward</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete reward?</Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleOk}>Ok</Button>
        </DialogActions>
      </Dialog>
    </UIFlexSpaceBox>
  );
};

export default RewardDetailHeader;
