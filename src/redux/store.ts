import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { createWrapper } from 'next-redux-wrapper';
import storage from './storage';
import {
  assetReducer,
  authReducer,
  appReducer,
  userReducer,
  locationReducer,
} from './slices';

const combinedReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  user: userReducer,
  location: locationReducer,
  asset: assetReducer,
});

const createStore = () => {
  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['auth', 'app', 'user', 'asset', 'location'],
  };

  const persistedReducer = persistReducer(persistConfig, combinedReducer);

  const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

  return store;
};

type ConfiguredStore = ReturnType<typeof createStore>;
type StoreGetState = ConfiguredStore['getState'];

export type RootState = ReturnType<StoreGetState>;
export type AppDispatch = ConfiguredStore['dispatch'];
export type AppThunk = ThunkAction<void, RootState, undefined, Action<string>>;

const wrapper = createWrapper<ConfiguredStore>(createStore, { debug: true });
export { wrapper, createStore };
