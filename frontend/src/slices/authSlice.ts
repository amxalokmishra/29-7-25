import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || '',
  role: localStorage.getItem('role') || '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      localStorage.setItem('token', state.token);
      localStorage.setItem('role', state.role);
    },
    logout: (state) => {
      state.token = '';
      state.role = '';
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;