import React, { useState, useEffect } from 'react';
import { UIFlexCenterBox, UIImage } from '@/components/UI';
import {
  StyledSidebarActiveButton,
  StyledSidebarActiveBar,
  StyledSidebarMenuWrapper,
  StyledSidebarButton,
  StyledSidebarWrapper,
  StyledSidebarDropButton,
} from './ui';
import { superSidebarItems } from '@/_mock/App';
import { useRouter } from 'next/router';
import { Box, Collapse, List } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const Sidebar = () => {
  const router = useRouter();
  const [selectedMenu, setSelectedMenu] = useState<number>(1);
  const [selectedDropdown, setSelectedDropdown] = useState<string>('');
  const [dropdownOpen, setDropdownOpen] = useState('');
  const path = router.asPath;
  useEffect(() => {
    superSidebarItems.map((item) => {
      if (item.dropdown)
        item.dropdown.map((dropdown) => {
          if (dropdown.route && path.includes(dropdown.route)) {
            setSelectedMenu(item.id);
            setDropdownOpen(item.text);
            setSelectedDropdown(dropdown.text);
          }
        });
      else if (path.includes(item.route as string)) {
        setSelectedMenu(item.id);
        setDropdownOpen(item.text);
      }
    });
  }, [superSidebarItems, path]);

  return (
    <StyledSidebarWrapper>
      <UIFlexCenterBox marginTop={2}>
        <UIImage src="images/icons/logo.svg" width={56} height={54} />
      </UIFlexCenterBox>
      <StyledSidebarMenuWrapper>
        {superSidebarItems.map((item, index) => {
          return (
            <Box sx={{ position: 'relative' }} key={index}>
              {item.id === selectedMenu && <StyledSidebarActiveBar />}
              <StyledSidebarButton
                disabled={item.disabled}
                onClick={() => {
                  setSelectedMenu(item.id);
                  setDropdownOpen(item.dropdown ? item.text : '');
                  item.route && router.push(`/${item.route}`);
                }}
                key={index}
                sx={item.id === selectedMenu ? StyledSidebarActiveButton : {}}
              >
                {item.text}
                {item.dropdown && (
                  <Box
                    component="span"
                    sx={{
                      display: 'flex',
                      paddingRight: '6px',
                    }}
                  >
                    {dropdownOpen === item.text ? (
                      <ExpandLess style={{ color: '#006F69' }} />
                    ) : (
                      <ExpandMore style={{ color: 'rgba(5, 34, 33, 0.8)' }} />
                    )}
                  </Box>
                )}
              </StyledSidebarButton>
              {item.dropdown && (
                <Collapse
                  in={item.text === dropdownOpen ? true : false}
                  timeout="auto"
                  unmountOnExit
                >
                  {item.dropdown &&
                    item.dropdown.map((dropdownItem, i) => (
                      <List disablePadding key={i}>
                        <StyledSidebarDropButton
                          sx={{
                            color:
                              selectedDropdown === dropdownItem.text &&
                              item.id === selectedMenu
                                ? '#008A83'
                                : '',
                          }}
                          onClick={() => {
                            setSelectedMenu(item.id);
                            setSelectedDropdown(dropdownItem.text);
                            dropdownItem.route &&
                              router.push(`/${dropdownItem.route}`);
                          }}
                        >
                          {dropdownItem.text}
                        </StyledSidebarDropButton>
                      </List>
                    ))}
                </Collapse>
              )}
            </Box>
          );
        })}
      </StyledSidebarMenuWrapper>
    </StyledSidebarWrapper>
  );
};

export default Sidebar;
