import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

export type ConfirmModalProps = {
  title: string;
  content: string;
  open: boolean;
  onClose: () => void;
  onAction: () => void;
};

const ConfirmModal = ({
  open,
  title,
  content,
  onClose,
  onAction,
}: ConfirmModalProps) => {
  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{content}</Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onAction}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
