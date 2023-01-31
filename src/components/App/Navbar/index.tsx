import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  Search as SearchIcon,
  Menu as MenuIcon,
  ExpandMoreOutlined as ExpandMoreOutlinedIcon,
} from '@mui/icons-material';
import {
  StyledAppBar,
  StyledIconButton,
  StyledNavbarMenu,
  StyledProfileMenuItem,
  Search,
  SearchIconWrapper,
  StyledInputBase,
  NotificationCategoryItem,
  NotificationMenuItem,
  NotificationMenuContainer,
} from './ui';
import { UIImage } from '@/components/UI';
import { notificationData } from '@/_mock/App/index';
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = ['Notifications', 'Profile', 'Logout'];
const dropdownMenuItems = ['Profile', 'Logout'];

export default function AppNavbar(props: Props) {
  const { window } = props;
  const router = useRouter();
  const { isAuthenticated, onLogout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElNotifications, setAnchorElNotifications] =
    useState<null | HTMLElement>(null);
  const isNotificationMenuOpen = Boolean(anchorElNotifications);
  const [anchorElSettingsMenu, setAnchorElSettingsMenu] =
    useState<null | HTMLElement>(null);
  const isSettingsMenuOpen = Boolean(anchorElSettingsMenu);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const mobileDrawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Elite Gaming <br></br> Mid West
      </Typography>
      <Divider />
      <List>
        {navItems.map((item: string) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleNavBtnClick = (key: string) => {
    if (key.includes('Signup') || key.includes('Login'))
      router.push(`/auth?path=${key.toLowerCase()}`);
    else if (key.includes('Logout')) onLogout();
    else if (key === 'My Points') router.push('/points');
    else router.push(`/${key.toLowerCase()}`);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <StyledAppBar>
        <Toolbar sx={{ height: '70px' }}>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Quick search"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', sm: 'flex', gap: '15px' } }}>
            {isAuthenticated && (
              <>
                <StyledIconButton
                  onClick={(event: React.MouseEvent<HTMLElement>) => {
                    setAnchorElNotifications(event.currentTarget);
                  }}
                  size="small"
                  disableRipple
                >
                  {notificationData?.length > 0 ? (
                    <UIImage
                      src={'images/icons/notifications-icon.svg'}
                      width={30}
                      height={30}
                    />
                  ) : (
                    <UIImage
                      src={'images/icons/notification-without-reddot.svg'}
                      width={30}
                      height={30}
                    />
                  )}
                </StyledIconButton>
                <StyledIconButton
                  onClick={(event: React.MouseEvent<HTMLElement>) => {
                    setAnchorElSettingsMenu(event.currentTarget);
                  }}
                  size="small"
                  aria-haspopup="true"
                  disableRipple
                >
                  <Avatar
                    sx={{ height: 36, width: 36, background: '#83A9A8' }}
                    src={''}
                    alt={'avatar'}
                  />
                  <Typography
                    sx={{
                      color: '#232B35',
                      fontSize: 14,
                      fontWeight: 400,
                      px: '10px',
                    }}
                  >
                    Administrator
                  </Typography>
                  <ExpandMoreOutlinedIcon
                    sx={{ color: '#83A9A8', marginRight: '15px' }}
                  />
                </StyledIconButton>
              </>
            )}
          </Box>
        </Toolbar>
      </StyledAppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {mobileDrawer}
        </Drawer>
      </Box>
      <StyledNavbarMenu
        anchorEl={anchorElSettingsMenu}
        open={isSettingsMenuOpen}
        onClose={() => {
          setAnchorElSettingsMenu(null);
        }}
        onClick={() => {
          setAnchorElSettingsMenu(null);
        }}
      >
        {dropdownMenuItems.map((el, index) => (
          <div key={index}>
            {index === 1 && <Divider sx={{ mx: 1 }} />}
            <StyledProfileMenuItem
              disableRipple
              disableTouchRipple
              onClick={() => handleNavBtnClick(el)}
            >
              <Typography>{el}</Typography>
            </StyledProfileMenuItem>
          </div>
        ))}
      </StyledNavbarMenu>
      <StyledNavbarMenu
        anchorEl={anchorElNotifications}
        open={isNotificationMenuOpen}
        onClose={() => {
          setAnchorElNotifications(null);
        }}
        onClick={() => {
          setAnchorElNotifications(null);
        }}
      >
        <NotificationMenuContainer disableRipple disableTouchRipple>
          <Box>
            <Typography
              sx={{ color: '#222B35', fontSize: 16, fontWeight: 600 }}
            >
              Notifications
            </Typography>
            <Typography sx={{ fontSize: 12 }}>
              {notificationData?.length > 0
                ? `You have ${notificationData?.length} unread messages`
                : 'No notification'}
            </Typography>
          </Box>

          <Box
            component="img"
            src={'/images/icons/double-tick.svg'}
            alt={'double-tick'}
          />
        </NotificationMenuContainer>

        {notificationData.length > 0 && (
          <div>
            <Divider sx={{ my: 0.5 }} />
            <NotificationCategoryItem disableRipple disableTouchRipple>
              <Typography>NEW</Typography>
            </NotificationCategoryItem>

            {notificationData.map((notification, index) => {
              const duration =
                new Date().valueOf() -
                new Date(notification.createdAt).valueOf();
              const isNew = duration < 24 * 3600 * 1000;
              return isNew ? (
                <NotificationMenuItem notification={notification} key={index} />
              ) : (
                ''
              );
            })}

            <NotificationCategoryItem
              disableRipple
              disableTouchRipple
              sx={{ marginTop: '8px', marginBottom: '8px' }}
            >
              <Typography>BEFORE THAT</Typography>
            </NotificationCategoryItem>
            {notificationData.map((notification, index) => {
              const duration =
                new Date().valueOf() -
                new Date(notification.createdAt).valueOf();
              const isNew = duration < 24 * 3600 * 1000;
              return !isNew ? (
                <NotificationMenuItem notification={notification} key={index} />
              ) : (
                ''
              );
            })}
            <Divider sx={{ my: 0.5 }} />
            <NotificationMenuContainer disableRipple disableTouchRipple>
              <Typography
                sx={{
                  width: '100%',
                  textAlign: 'center',
                  color: '#FB0202',
                  fontSize: 14,
                  fontWeight: 500,
                }}
                // onClick={() => navigate('/notifications')}
              >
                View All
              </Typography>
            </NotificationMenuContainer>
          </div>
        )}
      </StyledNavbarMenu>
    </Box>
  );
}
