import {
  Dialog,
  Typography,
  DialogTitle,
  IconButton,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface AppModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const AppModal = ({ title, open, onClose, children }: AppModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        '.MuiPaper-root': {
          backdropFilter: 'blur(20px)',
          borderRadius: '8px',
          border: 'solid 2px rgba(137, 200, 198, 0.05)',
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>
          {title}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      {children}
    </Dialog>
  );
};

export default AppModal;
