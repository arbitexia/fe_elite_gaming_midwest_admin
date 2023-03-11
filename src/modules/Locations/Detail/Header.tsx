import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import {
  UIFlexSpaceBox,
  UIDefaultButton,
  UIActionButton,
  UIFlexWrapBox,
} from '@/components/UI';
import { useLocation } from '@/hooks';
import { useAppToast } from '@/providers';

export type LocationDetailHeaderProps = {
  name: string;
  isEditable: boolean;
};

const LocationDetailHeader = ({
  name,
  isEditable,
}: LocationDetailHeaderProps) => {
  const router = useRouter();
  const appToast = useAppToast();
  const { id } = router.query;
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { onDeleteLocation } = useLocation();

  const handleCancel = () => {
    setOpenDeleteModal(false);
  };

  const handleOk = () => {
    setOpenDeleteModal(false);
    onDeleteLocation(parseInt(id as string));
    router.push('/locations');
    appToast({
      severity: 'success',
      message: `The ${name} has been removed!`,
    });
  };

  return (
    <UIFlexSpaceBox sx={{ mb: '35px', alignItems: 'center', gap: '12px' }}>
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
                router.push(`/locations/edit/${id}`);
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
        <DialogTitle>Delete {name}</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to remove {name}?</Typography>
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

export default LocationDetailHeader;
