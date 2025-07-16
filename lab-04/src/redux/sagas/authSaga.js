import { call, put, takeLatest } from 'redux-saga/effects';
import authService from '../../services/AuthService';
import { loginRequest, loginSuccess, loginFailure } from '../slices/authSlice';

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

// Watcher Saga: lắng nghe action loginRequest
function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
}

export default authSaga;
