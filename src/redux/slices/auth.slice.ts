import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';

export interface AuthState {
  authToken: string;
}

// Initial state
const initialState: AuthState = {
  authToken: '',
};

// Actual Slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to set the authentication status
    setAuthState(state, action) {
      state.authToken = action.payload;
    },
  },
});

export const { setAuthState } = authSlice.actions;

export const authSelector = (state: RootState) => state.auth;

export default authSlice.reducer;
