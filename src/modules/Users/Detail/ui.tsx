import { UIEditTextField, UIFlexWrapBox } from '@/components/UI';
import {
  styled,
  Avatar,
  Box,
  Button,
  Typography,
  TableRow,
  TableCell,
} from '@mui/material';

export const StyledUserInfoTitle = styled(Typography)({
  width: '110px',
  fontWeight: '600',
  fontSize: '14px',
  lineHeight: '150%',
  color: '#06251F',
});

export const StyledUserInfoValue = styled(Typography)({
  fontWeight: '400',
  fontSize: '14px',
  lineHeight: '150%',
  color: '#176467',
});

export const StyledUserInfoCard = styled(Box)({
  height: '300px',
  backgroundColor: '#ffffff',
  boxShadow: '5px 6px 30px -15px rgba(25, 42, 89, 0.2)',
  borderRadius: '15px',
  border: '1px solid #F3F3F3',
  overflow: 'hidden',
});

export const StyledUserInfoCardHeader = styled(Box)({
  height: '40px',
  backgroundImage: `url("/images/user-detail-view-bg.png")`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
});

export const StyledUserInfoAvatar = styled(Avatar)({
  width: '197px',
  height: '197px',
  background: '#4FD1C5',
  boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
  borderRadius: '8px',
});

export const StyledUserInfoCardContent = styled(UIFlexWrapBox)({
  padding: '20px 40px',
  gap: '50px',
  position: 'relative',
});

export const StyledUserInfoCardStatus = styled(UIFlexWrapBox)({
  position: 'absolute',
  top: '30px',
  right: '50px',
});

export const StyledUserRequestButton = styled(Button)({
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '21px',
  textDecorationLine: 'underline',
  textTransform: 'none',
  color: '#008A83',
});

export const StyledUserDetailCard = styled(Box)({
  padding: '40px 25px',
  background: '#FFFFFF',
  border: '1px solid #F3F3F3',
  boxShadow: '5px 6px 30px -15px rgba(25, 42, 89, 0.2)',
  borderRadius: '15px',
  flex: '1 1 0',
});

export const StyledRequestTableCell = styled(TableCell)({
  fontSize: 14,
  height: '50px',
  fontWeight: 400,
  color: 'rgba(0, 0, 0, 0.3)',
  background: '#FFFFFF',
  border: '1px solid #F3F3F3',
  borderLeft: 0,
  borderRight: 0,
  '&:first-of-type': {
    borderRadius: '7px 0 0 7px',
  },
  '&:last-of-type': {
    borderRadius: '0 7px 7px 0',
  },

  '&:nth-of-type(2)': {
    color: '#06251F',
    fontWeight: 600,
  },
  '&:nth-of-type(3)': {
    color: '#06251F',
  },
  '&:nth-of-type(4)': {
    color: '#008A83',
    fontWeight: 500,
  },
  '&:nth-of-type(6)': {
    color: 'rgba(0, 0, 0, 0.3)',
    fontWeight: 500,
  },
});

export const StyledRequestTableRow = styled(TableRow)({
  boxShadow: '0px 7px 20px rgba(25, 42, 89, 0.05)',
});

export const StyledUserTableCell = styled(TableCell)({
  fontSize: 14,
  height: '50px',
  fontWeight: 400,
  color: 'rgba(0, 0, 0, 0.3)',
  background: '#FFFFFF',
  border: '1px solid #F3F3F3',
  borderRight: 0,
  borderLeft: 0,
  '&:first-of-type': {
    borderRadius: '7px 0 0 7px',
  },
  '&:last-of-type': {
    borderRadius: '0 7px 7px 0',
  },
});

export const StyledTransactionTableCell = styled(TableCell)({
  fontSize: 14,
  fontWeight: 400,
  color: 'rgba(0, 0, 0, 0.3)',
  border: 0,
  height: '40px',
});

export const StyledRewardsTableCell = styled(TableCell)({
  height: '80px',
  fontSize: 14,
  fontWeight: 500,
  color: 'rgba(0, 0, 0, 0.3)',
  background: '#FFFFFF',
  border: '1px solid #F3F3F3',
  borderRight: 0,
  borderLeft: 0,
  '&:first-of-type': {
    borderRadius: '7px 0 0 7px',
  },
  '&:last-of-type': {
    borderRadius: '0 7px 7px 0',
  },
});

export const StyledUserEditTextField = styled(UIEditTextField)({
  width: '250px',
});

export const StyledUserUploadButton = styled(Button)({
  width: '130px',
  height: '42px',
  background: 'rgba(60, 96, 95, 0.8)',
  border: '1px solid rgba(191, 215, 225, 0.05)',
  borderRadius: '8px',
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '24px',
  color: '#FFFFFF',
  '&:hover': {
    background: 'rgba(60, 96, 95, 0.5)',
  },
});
