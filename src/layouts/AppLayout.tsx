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
    <UIAppLayoutWrapper sx={{ background: props.bg }}>
      <AppSEO title={props.title || ''} description={props.description || ''} />
      <UIContainer sx={{ py: 0 }}>{props.children}</UIContainer>
    </UIAppLayoutWrapper>
  );
};

export default AppLayout;
