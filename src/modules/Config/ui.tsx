import { UIEditTextField, UIFlexColumnBox } from '@/components/UI';
import { styled, Box, Typography } from '@mui/material';

export const StyledConfigInfoTitle = styled(Typography)({
  width: '110px',
  fontWeight: '600',
  fontSize: '14px',
  lineHeight: '150%',
  color: '#06251F',
});

export const StyledConfigInfoValue = styled(Typography)({
  fontWeight: '400',
  fontSize: '14px',
  lineHeight: '150%',
  color: '#176467',
});

export const StyledConfigInfoCard = styled(Box)({
  backgroundColor: '#ffffff',
  boxShadow: '5px 6px 30px -15px rgba(25, 42, 89, 0.2)',
  borderRadius: '15px',
  border: '1px solid #F3F3F3',
  overflow: 'hidden',
});

export const StyledConfigInfoCardHeader = styled(Box)({
  height: '40px',
  backgroundImage: `url("/images/user-detail-view-bg.png")`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
});

export const StyledConfigInfoCardContent = styled(UIFlexColumnBox)({
  position: 'relative',
  padding: '42px',
  gap: '32px',
});

export const StyledConfigEditTextField = styled(UIEditTextField)({
  width: '250px',
});
