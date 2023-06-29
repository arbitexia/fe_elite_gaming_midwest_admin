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
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import {
  UIActionButton,
  UIDefaultButton,
  UIFlexSpaceBox,
} from '@/components/UI';
import { CampaignType } from '@/types';
import { useRouter } from 'next/router';

interface CampaignDetailHeaderProps {
  campaign: CampaignType.Data;
  onSave?: () => void;
}

const CampaignDetailHeader = ({
  campaign,
  onSave,
}: CampaignDetailHeaderProps) => {
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
      {campaign && (
        <UIFlexSpaceBox>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 36,
              lineHeight: '54px',
              color: '#89C8C6',
            }}
          >
            {campaign.id === 0
              ? 'Create Campaign'
              : `${campaign?.name ?? 'Campaign'}`}
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              {router.asPath.includes('edit') || campaign.id === 0 ? (
                <UIDefaultButton
                  sx={{ minWidth: '110px', borderRadius: '8px' }}
                  type="submit"
                  onClick={onSave}
                >
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

export default CampaignDetailHeader;
