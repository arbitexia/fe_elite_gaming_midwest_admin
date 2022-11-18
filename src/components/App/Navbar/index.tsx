import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks';
import {
  AppBar,
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
  Menu as MenuIcon,
  ExpandMoreOutlined as ExpandMoreOutlinedIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import {
  StyledIconButton,
  StyledNavbarMenu,
  StyledProfileMenuItem,
} from './ui';

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
    console.log(isNotificationMenuOpen);
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
      <AppBar
        component="nav"
        sx={{
          position: 'relative',
          height: '70px',
          width: '100%',
          background: 'rgba(255, 255, 255, 0.85)',
          border: '2px solid rgba(54, 70, 70, 0.05)',
          boxShadow: '0px 3px 20px rgba(0, 0, 0, 0.05)',
          backdropFilter: 'blur(7.5px)',
        }}
      >
        <Toolbar sx={{ height: '70px' }}>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
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
                  <NotificationsIcon
                    sx={{ fontSize: '30px', color: '#83A9A8' }}
                  />
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
                  <ExpandMoreOutlinedIcon sx={{ color: '#83A9A8' }} />
                </StyledIconButton>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
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
    </Box>
  );
}
