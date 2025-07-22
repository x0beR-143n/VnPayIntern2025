import { call, put, takeLatest, delay, all } from 'redux-saga/effects';
import authService from '../../services/AuthService';
import { loginRequest, loginSuccess, loginFailure, logout, logoutRequest } from '../slices/authSlice';

// Worker Saga: thực hiện cuộc gọi API
function* handleLogin(action) {
  try {
    const response = yield call(authService.login, action.payload.email, action.payload.password);
    
    // Nếu thành công, dispatch action loginSuccess với dữ liệu từ API
    yield put(loginSuccess(response));
    console.log('Login successful, token:', response.token);

  } catch (error) {
    // Nếu thất bại, dispatch action loginFailure với thông báo lỗi
    yield put(loginFailure(error.message));
    console.error('Login failed:', error.message);
  }
}

function* handleLogout() {
  try {
    // Hiển thị loading 5 giây
    yield delay(5000);
    yield put(logout());
  } catch (error) {
    console.error('Logout error:', error);
  }
}

// Watcher Saga: lắng nghe action loginRequest
function* watchLoginSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
}

function* watchLogoutSaga() {
  yield takeLatest(logoutRequest.type, handleLogout);
}

export default function* authSaga() {
  yield all([
    watchLoginSaga(),
    watchLogoutSaga(),
  ]);
}
