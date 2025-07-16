// src/features/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
 
const initialState = {
  isLoggedIn: false,
  username: '',
  email: '',
  token: '',
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action này sẽ được dispatch từ component khi người dùng nhấn đăng nhập
    loginRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    // Action này sẽ được Saga dispatch sau khi gọi API thành công
    loginSuccess: (state, action) => {
      const { username, email, token } = action.payload;
      state.isLoggedIn = true;
      state.username = username; 
      state.email = email;
      state.token = token;
      state.isLoading = false;
      state.error = null;
    },
    // Action này sẽ được Saga dispatch khi gọi API thất bại
    loginFailure: (state, action) => {
      state.isLoggedIn = false;
      state.username = '';
      state.email = '';
      state.token = '';
      state.isLoading = false;
      state.error = action.payload; // Lưu thông báo lỗi
    },
    // Action này để thiết lập lại trạng thái khi logout
    logout: (state) => {
      state.isLoggedIn = false;
      state.username = '';
      state.email = '';
      state.token = '';
      state.isLoading = false;
      state.error = null;
      // Redux Persist sẽ tự động xóa dữ liệu khi state thay đổi về initialState
    },
    // Action này dùng để khôi phục trạng thái từ Redux Persist
    // (Thực tế Redux Persist tự động làm, nhưng có thể dùng cho logic phức tạp hơn)
    setAuthData: (state, action) => {
      const { isLoggedIn, username, email, token } = action.payload;
      state.isLoggedIn = isLoggedIn;
      state.username = username;
      state.email = email;
      state.token = token;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout, setAuthData } = authSlice.actions;
export default authSlice.reducer;
