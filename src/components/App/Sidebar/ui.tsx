import { styled, Box, Button } from '@mui/material';

export const StyledSidebarWrapper = styled(Box)(({ theme }) => ({
  width: '220px',
  minHeight: '100vh',
  display: 'flex',
  flexShrink: '0',
  backgroundColor: theme.palette.common.white,
  flexDirection: 'column',
  border: '3px solid rgba(137, 200, 198, 0.05)',
  boxShadow: '0px 4px 80px rgba(0, 0, 0, 0.05)',
}));

export const StyledSidebarMenuWrapper = styled(Box)({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  padding: '45px 0',
  overflowY: 'auto',
  overflowX: 'hidden',
});

export const StyledSidebarButton = styled(Button)({
  position: 'relative',
  width: '195px',
  height: '42px',
  justifyContent: 'space-between',
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '21px',
  color: 'rgba(5, 34, 33, 0.8)',
  borderRadius: '50px 0 0 50px',
  paddingLeft: '32px',
  textTransform: 'none',
});

export const StyledSidebarDropButton = styled(Button)({
  position: 'relative',
  width: '195px',
  height: '42px',
  justifyContent: 'flex-start',
  fontWeight: '400',
  fontSize: '14px',
  lineHeight: '21px',
  color: 'rgba(5, 34, 33, 0.8)',
  borderRadius: '50px 0 0 50px',
  paddingLeft: '32px',
  textTransform: 'none',
  ':before': {
    content: '""',
    width: '4px',
    height: '4px',
    borderRadius: '2px',
    marginRight: '20px',
    backgroundColor: '#697A7A',
  },
});

export const StyledSidebarActiveButton = {
  backgroundColor: '#00FFF81A',
  fontWeight: '600',
  color: '#006F69',
};

export const StyledSidebarActiveBar = styled(Box)({
  position: 'absolute',
  width: '6px',
  height: '24px',
  background: '#008A83',
  top: '8px',
  left: '-16px',
});
