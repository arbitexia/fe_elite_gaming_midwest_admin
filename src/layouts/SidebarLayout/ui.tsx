import { styled, Box, Button } from '@mui/material';

export const StyledSidebarWrapper = styled(Box)(({ theme }) => ({
  width: '270px',
  minHeight: '100vh',
  display: 'flex',
  flexShrink: '0',
  backgroundColor: theme.palette.common.white,
  flexDirection: 'column',
  border: '3px solid rgba(137, 200, 198, 0.05)',
  boxShadow: '0px 4px 80px rgba(0, 0, 0, 0.05)',
}));

export const StyledMenuWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  padding: '45px 0',
  overflowY: 'auto',
  overflowX: 'hidden',
}));

export const StyledNavButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  width: '230px',
  height: '42px',
  justifyContent: 'flex-start',
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '21px',
  color: '#052221CC',
  borderRadius: '50px 0 0 50px',
  paddingLeft: '32px',
}));

export const activeButton = {
  color: '#006F69',
  backgroundColor: '#00FFF81A',
};

export const StyledActiveBar = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '6px',
  height: '24px',
  background: '#008A83',
  top: '8px',
  left: '-18px',
}));
