import { Menu, MenuItem, Typography, styled } from '@mui/material';

export const UISelectMenuItem = styled(MenuItem)({
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '21px',
  textAlign: 'center',
  color: 'rgba(137, 200, 198, 0.8)',
});

export const UIOptionMenu = styled(Menu)({
  '&.MuiMenu-paper': {
    background: '#FFFFFF',
    borderRadius: '8px',
    border: '1px solid rgba(137, 200, 198, 0.15)',
    boxShadow: '10px 10px 25px rgba(25, 42, 89, 0.15)',
    overflow: 'visible',
  },
});

export const UIOptionMenuItem = styled(MenuItem)({
  width: '170px',
  padding: '10px 20px',
});

export const UIOptionMenuItemText = styled(Typography)({
  fontSize: 14,
  fontWeight: 600,
});
