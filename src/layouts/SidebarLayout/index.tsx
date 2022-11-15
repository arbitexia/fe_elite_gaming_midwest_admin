import React, { useState } from 'react';
import { UIFlexCenterBox, UIImage } from '@/components/UI';
import {
  activeButton,
  StyledActiveBar,
  StyledMenuWrapper,
  StyledNavButton,
  StyledSidebarWrapper,
} from './ui';
import { SidebarMenus } from '@/utils/constants';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';

interface ISidebarProps {}

const SidebarLayout = ({}: ISidebarProps) => {
  const router = useRouter();
  const [clickedButtonIndex, setClickedButtonIndex] = useState<number>(1);

  return (
    <StyledSidebarWrapper>
      <UIFlexCenterBox marginTop={2}>
        <UIImage src="images/icons/logo.svg" width={56} height={54} />
      </UIFlexCenterBox>
      <StyledMenuWrapper>
        {SidebarMenus.map(({ id, name, path }, index) => {
          return (
            <Box sx={{ position: 'relative' }}>
              {id === clickedButtonIndex && <StyledActiveBar></StyledActiveBar>}
              <StyledNavButton
                onClick={() => {
                  setClickedButtonIndex(id);
                  // router.push(path);
                }}
                key={index}
                sx={id === clickedButtonIndex ? activeButton : {}}
              >
                {name}
              </StyledNavButton>
            </Box>
          );
        })}
      </StyledMenuWrapper>
    </StyledSidebarWrapper>
  );
};

export default SidebarLayout;
