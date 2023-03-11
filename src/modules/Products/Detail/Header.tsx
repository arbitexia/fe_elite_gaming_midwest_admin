import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import {
  UIFlexSpaceBox,
  UIDefaultButton,
  UIActionButton,
  UIFlexWrapBox,
} from '@/components/UI';
import { useProduct } from '@/hooks';
import { useAppToast } from '@/providers';

export type ProductDetailHeaderProps = {
  name: string;
  isEditable: boolean;
};

const ProductDetailHeader = ({
  name,
  isEditable,
}: ProductDetailHeaderProps) => {
  const router = useRouter();
  const { id } = router.query;
  const appToast = useAppToast();
  const { onDeleteProduct } = useProduct();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleOk = () => {
    onDeleteProduct(parseInt(id as string));
    setOpenDeleteModal(false);
    router.push('/products');
    appToast({
      severity: 'success',
      message: `The ${name} has been removed!`,
    });
  };

  const handleCancel = () => {
    setOpenDeleteModal(false);
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
                router.push(`/products/edit/${id}`);
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
        <DialogTitle>Delete Product {name}</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete product {name} ?
          </Typography>
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

export default ProductDetailHeader;
