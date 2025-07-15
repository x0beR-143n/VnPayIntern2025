// src/features/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  isLoggedIn: false,
  username: '',
  email: '',
  token: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { username, email } = action.payload;
      state.isLoggedIn = true;
      state.username = username;
      state.email = email;
      state.token = uuidv4();
    },
    logout: () => {
      return initialState;
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
