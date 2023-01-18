import axios from 'axios';
import { refreshToken, logout } from '../slices';
import { AnyAction, Store } from '@reduxjs/toolkit';
import config from '@/config';

const baseUrl: string = config.API_URL || '';

export const jwtAxios = axios.create({
  baseURL: `${baseUrl}/api`,
});

export const setupJwt = (store: Store<unknown, AnyAction>) => {
  const { dispatch } = store;
  jwtAxios.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;

      if (err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            const rs = await axios.post(`${baseUrl}/api/refreshToken`, {
              refreshToken: localStorage.getItem('refreshToken'),
            });

            const { accessToken } = rs.data;
            dispatch(refreshToken(accessToken));

            return jwtAxios(originalConfig);
          } catch (_error) {
            dispatch(logout());
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    }
  );
};
