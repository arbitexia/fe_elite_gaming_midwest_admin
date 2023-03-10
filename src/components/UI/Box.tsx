import { styled, Box } from '@mui/material';

export const UIFlexWrapBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
}));

export const UIFlexSpaceBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const UIFlexCenterBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const UIFlexColumnBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexFlow: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const UICardBox = styled(Box)({
  padding: '30px 30px',
  background: '#FFFFFF',
  border: '1px solid #F3F3F3',
  boxShadow: '5px 6px 30px -15px rgba(25, 42, 89, 0.2)',
  borderRadius: '15px',
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 0',
  minHeight: '450px',
});
