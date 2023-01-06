import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useStore } from 'react-redux';
import { useRouter } from 'next/router';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { wrapper } from '@/redux/store';
import { AppToastProvider, AppThemeProvider } from '@/providers';

function EliteApp({ Component, pageProps }: AppProps) {
  const store = useStore();
  const router = useRouter();
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (typeof window.history.pushState == 'function') {
      window.history.pushState(
        null,
        'admin.elitegaming.rpatdev.com',
        window.location.hash.substring(2)
      );
    } else {
      window.location.hash = window.location.hash.substring(2);
    }
  });

  const path = (/#!(\/.*)$/.exec(router.asPath) || [])[1];
  console.log(path);
  // if (path) {
  //   router.replace(path, { query: router.query });
  // }
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
