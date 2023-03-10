import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import { AppSEO, AppNavbar, AppSidebar } from '@/components/App';
import { UIAppLayoutWrapper, UIContainer } from '@/components/UI';
import { useAuth } from '@/hooks';

interface Props {
  title?: string;
  description?: string;
  children: React.ReactNode | React.ReactNode[];
}

const AppLayout = (props: Props) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth({});
  useEffect(() => {
    if (!isAuthenticated) router.push('/login');
  }, [isAuthenticated]);
  return (
    <UIAppLayoutWrapper sx={{ background: '#F7F7F7' }}>
      <AppSEO title={props.title as string} description="" />
      {isAuthenticated && (
        <Box sx={{ display: 'flex' }}>
          <AppSidebar />
          <Box
            sx={(theme) => ({
              gap: 0,
              minWidth: `calc(100% - 220px)`,
              minHeight: '100vh',
              overflow: 'hidden',
              overflowY: 'auto',
              [theme.breakpoints.down('md')]: {
                width: '100%',
                marginLeft: '0px',
              },
              transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.standard,
              }),
            })}
          >
            <AppNavbar />
            <UIContainer>{props.children}</UIContainer>
          </Box>
        </Box>
      )}
    </UIAppLayoutWrapper>
  );
};

export default AppLayout;
