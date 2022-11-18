import React from 'react';
import { AppSEO } from '@/components/App';
import { UIFlexCenterBox } from '@/components/UI';

interface Props {
  bg?: string;
  title?: string;
  description?: string;
  children: React.ReactNode | React.ReactNode[];
}

const AuthLayout = (props: Props) => {
  return (
    <UIFlexCenterBox height="100vh" sx={{ background: props.bg }}>
      <AppSEO title={props.title || ''} description={props.description || ''} />
      {props.children}
    </UIFlexCenterBox>
  );
};

export default AuthLayout;
