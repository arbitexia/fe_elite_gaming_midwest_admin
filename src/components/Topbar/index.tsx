import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';
import { NotificationsNone, ExpandMoreRounded } from '@mui/icons-material';
import { UIImage } from '@/components/UI';
import { activeButton, StyledAvatarWrapper, StyledNavButton } from './ui';
import { TopMenus } from '@/utils/constants';

interface ITopbarProps {
  window?: () => Window;
}

export default function Topbar({ window }: ITopbarProps) {
  const router = useRouter();
  const [clickedButtonIndex, setClickedButtonIndex] = useState<number>(0);

  const handleNavBtnClick = (key: string) => {};

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
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
        <Toolbar component={Container} sx={{ height: '70px' }}>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: {
                xs: 'none',
                sm: 'flex',
                alignItems: 'center',
                gap: '15px',
              },
            }}
          >
            {TopMenus.map(({ id, name, path }) => (
              <StyledNavButton
                key={id}
                btnType={name}
                onClick={() => {
                  setClickedButtonIndex(id);
                  handleNavBtnClick(path);
                }}
                sx={id === clickedButtonIndex ? activeButton : {}}
              >
                {name}
              </StyledNavButton>
            ))}
            <NotificationsNone sx={{ color: '#89C8C6', fontSize: 30 }} />
            <Button>
              <StyledAvatarWrapper>
                <UIImage
                  src="images/icons/user_placeholder.svg"
                  width={22}
                  height={22}
                />
              </StyledAvatarWrapper>
              <ExpandMoreRounded sx={{ color: '#89C8C6', fontSize: 30 }} />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
