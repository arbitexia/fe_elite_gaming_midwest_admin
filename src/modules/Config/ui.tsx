import { UIEditTextField, UIFlexColumnBox } from '@/components/UI';
import { styled, Box, Typography } from '@mui/material';

export const StyledConfigInfoTitle = styled(Typography)({
  width: '80px',
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
  height: '310px',
});

export const StyledConfigInfoCardContent = styled(UIFlexColumnBox)({
  position: 'relative',
  alignItems: 'flex-start',
  paddingTop: '42px',
  gap: '24px',
  width: '100%',
});

export const StyledConfigEditTextField = styled(UIEditTextField)({
  width: '250px',
});
