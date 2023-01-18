import type { AppProps } from 'next/app';
import { useStore } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { wrapper } from '@/redux/store';
import { AppToastProvider, AppThemeProvider } from '@/providers';
import { setupJwt } from '@/redux/apis/axios.api';

function EliteApp({ Component, pageProps }: AppProps) {
  const store = useStore();
  setupJwt(store);
  return (
    <AppThemeProvider>
      <AppToastProvider>
        <PersistGate loading={null} persistor={persistStore(store)}>
          <Component {...pageProps} />
        </PersistGate>
      </AppToastProvider>
    </AppThemeProvider>
  );
}

export default wrapper.withRedux(EliteApp);
