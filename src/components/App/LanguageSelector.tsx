import { useState } from 'react';
import { useSelectedLanguage, LanguageSwitcher } from 'next-export-i18n';
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import { languageMenuItems } from '@/_mock/App';
import { UIImage } from '@/components/UI';

export const LanguageSelector = () => {
  const [anchorElLanguage, setAnchorElLanguage] = useState<null | HTMLElement>(
    null
  );
  const { lang } = useSelectedLanguage();
  const isLanguageMenuOpen = Boolean(anchorElLanguage);

  return (
    <Box sx={{ position: 'absolute', left: '75px', top: '75px' }}>
      <Button
        disableElevation
        onClick={(e) => {
          setAnchorElLanguage(e.currentTarget);
        }}
        startIcon={
          <UIImage src={`images/icons/${lang}.svg`} width={24} height={24} />
        }
      >
        <Typography
          sx={{
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '14px',
            lineHeight: '21px',
            color: '#83A9A8',
            textTransform: 'none',
          }}
        >
          {lang === 'en' ? 'English' : 'Español'}
        </Typography>
      </Button>
      <Menu
        PaperProps={{
          elevation: 0,
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        anchorEl={anchorElLanguage}
        open={isLanguageMenuOpen}
        onClose={() => {
          setAnchorElLanguage(null);
        }}
        onClick={() => {
          setAnchorElLanguage(null);
        }}
      >
        {languageMenuItems.map((languageItem, index) => (
          <LanguageSwitcher key={index} lang={languageItem.key}>
            <MenuItem>
              <Box sx={{ borderRadius: '50%' }}>
                <UIImage src={languageItem.icon} width={24} height={24} />
              </Box>
              <Typography
                sx={{
                  fontStyle: 'normal',
                  fontWeight: '400',
                  fontSize: '14px',
                  lineHeight: '21px',
                  color: '#83A9A8',
                  textTransform: 'none',
                  marginLeft: '8px',
                }}
              >
                {languageItem.text}
              </Typography>
            </MenuItem>
          </LanguageSwitcher>
        ))}
      </Menu>
    </Box>
  );
};
