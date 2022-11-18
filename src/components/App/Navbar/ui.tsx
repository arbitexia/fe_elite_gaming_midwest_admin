import {
  styled,
  Button,
  IconButton,
  MenuProps,
  Menu,
  MenuItem,
} from '@mui/material';

export type StyledNavButtonProp = {
  btnType: string;
};

export const StyledNavButton = styled(Button)<StyledNavButtonProp>(
  ({ btnType }) => ({
    background:
      btnType === 'Signup'
        ? 'radial-gradient(300.75% 955.63% at 85.18% 5.81%, rgba(0, 255, 148, 0.16) 0%, rgba(255, 255, 255, 0.002) 100%), radial-gradient(97.65% 173.77% at -3.15% 77.15%, rgba(14, 71, 112, 0.2) 0%, rgba(24, 77, 89, 0.2) 23.15%, rgba(17, 54, 81, 0) 100%), #001817'
        : btnType === 'Login'
        ? 'rgba(191, 215, 225, 0.05)'
        : 'transparent',
    border:
      btnType === 'Signup'
        ? '1px solid rgba(191, 215, 225, 0.05)'
        : btnType === 'Login'
        ? '1px solid rgba(137, 200, 198, 0.2)'
        : 'transparent',
    borderRadius: '8px',
    width: '100px',
    height: '42px',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '21px',
    textTransform: 'none',
    color: '#FFFFFF',
  })
);

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginLeft: 15,
  [theme.breakpoints.down('md')]: {
    marginLeft: 10,
  },
  [theme.breakpoints.down('xs')]: {
    marginLeft: 5,
  },
}));

export const StyledNavbarMenu = (props: MenuProps) => {
  return (
    <Menu
      PaperProps={{
        elevation: 0,
        sx: {
          background: '#FFFFFF',
          borderRadius: '8px',
          border: '1px solid rgba(137, 200, 198, 0.15)',
          boxShadow: '10px 10px 25px rgba(25, 42, 89, 0.15)',
          overflow: 'visible',
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      {...props}
    >
      {props.children}
    </Menu>
  );
};

export const StyledProfileMenuItem = styled(MenuItem)(() => ({
  margin: '0px 20px',
  borderRadius: '8px',
  padding: '8px 0px 8px 0px',
  width: '100px',
  display: 'flex',
  justifyContent: 'space-between',
  '&:hover': {
    backgroundColor: 'transparent',
  },
  p: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 500,
    // color: '#667180',
  },
}));
