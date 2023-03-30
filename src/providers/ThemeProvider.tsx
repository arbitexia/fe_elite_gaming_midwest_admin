import { ReactNode } from 'react';
import { CssBaseline, ThemeProvider, GlobalStyles } from '@mui/material';
import { useAppSelector } from '@/hooks';
import { appSelector } from '@/redux/slices';
import { createAppTheme } from '@/theme';

interface AppThemeProviderProps {
  children: ReactNode | ReactNode[];
}

function AppThemeProvider({ children }: AppThemeProviderProps) {
  const { theme } = useAppSelector(appSelector);

  return (
    <ThemeProvider theme={createAppTheme(theme.mode)}>
      <GlobalStyles
        styles={{
          '*::-webkit-scrollbar': {
            width: '5px',
          },
          '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,0.2)',
          },
        }}
      />
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default AppThemeProvider;
