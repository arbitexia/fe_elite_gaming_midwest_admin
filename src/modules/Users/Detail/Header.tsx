import { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Replay as ReplayIcon,
} from '@mui/icons-material';
import {
  UIActionButton,
  UIDefaultButton,
  UIFlexSpaceBox,
} from '@/components/UI';
import { UserType } from '@/types';
import { useRouter } from 'next/router';

interface UsersDetailHeaderProps {
  user: UserType.User;
}

const UsersDetailHeader = ({ user }: UsersDetailHeaderProps) => {
  const router = useRouter();
  const { slug, id } = router.query;
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleCancel = () => {
    setOpenDeleteModal(false);
  };
  const handleOk = () => {
    setOpenDeleteModal(false);
  };
  return (
    <>
      {user && (
        <UIFlexSpaceBox>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 36,
              lineHeight: '54px',
              color: '#89C8C6',
            }}
          >
            {user.id === 0
              ? 'Create User'
              : `${user.firstName} ${user.lastName}'s Information`}
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              {user.id !== 0 && (
                <UIActionButton
                  icon={<ReplayIcon />}
                  color="#667180"
                  title="Change password"
                  handleClick={() => console.log('ActionButton')}
                />
              )}
              {router.asPath.includes('edit') || user.id === 0 ? (
                <UIDefaultButton sx={{ marginLeft: '8px' }} type="submit">
                  Save
                </UIDefaultButton>
              ) : (
                <>
                  <UIActionButton
                    icon={<EditIcon />}
                    color="#28B446"
                    title="Edit"
                    handleClick={() => {
                      router.push(`/users/${slug}/edit/${id}`);
                    }}
                  />
                  <UIActionButton
                    icon={<DeleteIcon />}
                    color="#F14336"
                    title="Delete"
                    handleClick={() => setOpenDeleteModal(true)}
                  />
                </>
              )}
            </Box>
          </Stack>
          <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
            maxWidth="xs"
            open={openDeleteModal}
          >
            <DialogTitle>Delete User</DialogTitle>
            <DialogContent>
              <Typography>Are you sure you want to delete User?</Typography>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleOk}>Ok</Button>
            </DialogActions>
          </Dialog>
        </UIFlexSpaceBox>
      )}
    </>
  );
};

export default UsersDetailHeader;
