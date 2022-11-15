import React from 'react';
import { AppSEO } from '@/components/App';
import { UIAppLayoutWrapper, UIContainer } from '@/components/UI';
import SidebarLayout from './SidebarLayout';
import { Topbar } from '@/components';
import { Box } from '@mui/material';

interface Props {
  bg?: string;
  title?: string;
  description?: string;
  children: React.ReactNode | React.ReactNode[];
}

const AppLayout = ({ bg, title, description, children }: Props) => {
  return (
    <UIAppLayoutWrapper sx={{ background: bg }}>
      <AppSEO title={title || ''} description={description || ''} />
      <Box sx={{ display: 'flex' }}>
        <SidebarLayout />
        <Box sx={{ width: '100%' }}>
          <Topbar />
          <UIContainer>{children}</UIContainer>
        </Box>
      </Box>
    </UIAppLayoutWrapper>
  );
};

export default AppLayout;
