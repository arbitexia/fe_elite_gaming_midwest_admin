import { intervalToDuration, formatDuration } from 'date-fns';
import {
  styled,
  AppBar,
  Button,
  IconButton,
  MenuProps,
  Menu,
  MenuItem,
  Box,
  InputBase,
  Typography,
} from '@mui/material';
import { NotificationMenuItemProps } from '@/types';
import { UIInfoTitle } from '@/components/UI';

export const Search = styled(Box)({
  position: 'relative',
  borderRadius: '4px',
  backgroundColor: 'transparent',
  width: '100%',
  color: '#667180',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255, 0.25)',
  },
});

export const SearchIconWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    fontSize: '14px',
    color: '#667180',
    '&::placeholder': {
      fontSize: '14px',
    },
    [theme.breakpoints.down('md')]: {
      width: '20ch',
      display: 'none',
    },
  },
}));

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

export const StyledAppBar = styled(AppBar)({
  position: 'relative',
  height: '70px',
  width: '100%',
  background: '#FFFFFFD5',
  border: '2px solid rgba(54, 70, 70, 0.05)',
  boxShadow: '0px 3px 20px rgba(0, 0, 0, 0.05)',
});

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
          display: 'block',
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
  },
}));

const Notification = styled(MenuItem)(() => ({
  padding: '8px 20px 8px 20px',
  position: 'relative',
  alignItems: 'baseline',
}));

export const NotificationMenuItem = ({
  notification,
}: NotificationMenuItemProps) => {
  const duration =
    new Date().valueOf() - new Date(notification.createdAt).valueOf();
  const isNew = duration < 24 * 3600 * 1000;
  const durationText = formatDuration(
    intervalToDuration({ start: 0, end: duration })
  );
  let detail = '';
  let title = '';
  switch (notification.model) {
    case 'USER':
      title = 'New user is resistered';
      detail = `New user name is ${notification.data?.firstName} ${notification.data?.lastName} Phonenumber is ${notification.data?.phonenumber}`;
      break;
    case 'REWARD':
      title = 'New product is created';
      detail = `New product name is ${notification.data?.name}`;
      break;
    case 'REQUEST':
      title = 'New request is created';
      detail = `${notification.data?.user.firstName} ${notification.data?.user.lastName} make ${notification.data?.item.name} request`;
  }
  return (
    <Notification disableRipple disableTouchRipple>
      <Box
        component="img"
        src={
          isNew ? '/images/icons/green-dot.svg' : '/images/icons/grey-dot.svg'
        }
        alt={isNew ? 'greenDot' : 'greyDot'}
        sx={{
          marginRight: '30px',
          marginLeft: '10px',
        }}
      />
      <Box sx={{ width: '250px' }}>
        <UIInfoTitle>{title}</UIInfoTitle>
        <Typography sx={{ fontSize: 14, whiteSpace: 'pre-wrap' }}>
          {detail}
        </Typography>
        <Box
          component="div"
          sx={{
            fontSize: 12,
            display: 'flex',
            alignItems: 'flex-start',
            marginTop: '5px',
            whiteSpace: 'pre-wrap',
          }}
        >
          <Box
            component="img"
            src={'/images/icons/clock.svg'}
            alt={'clock'}
            sx={{ marginRight: '10px' }}
          />
          {durationText}
        </Box>
      </Box>
    </Notification>
  );
};

export const NotificationMenuContainer = styled(MenuItem)(() => ({
  margin: '0px 20px',
  borderRadius: '8px',
  padding: '8px 0px 8px 0px',
  display: 'flex',
  justifyContent: 'space-between',
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));

export const NotificationCategoryItem = styled(MenuItem)({
  margin: '0px 20px',
  padding: '0px 0px 5px 0px',
  p: {
    fontWeight: 500,
    fontSize: 12,
  },
  '&:hover': {
    backgroundColor: 'transparent',
  },
});
