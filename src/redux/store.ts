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
  pointReducer,
  awardReducer,
  productReducer,
  rewardReducer,
  activityReducer,
  configReducer,
  tabletReducer,
  transactionReducer,
} from './slices';

const combinedReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  user: userReducer,
  location: locationReducer,
  asset: assetReducer,
  point: pointReducer,
  award: awardReducer,
  product: productReducer,
  reward: rewardReducer,
  activity: activityReducer,
  config: configReducer,
  tablet: tabletReducer,
  transaction: transactionReducer,
});

const createStore = () => {
  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: [
      'auth',
      'app',
      'user',
      'asset',
      'location',
      'point',
      'award',
      'product',
      'reward',
      'activity',
      'config',
      'tablet',
      'transaction',
    ],
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
