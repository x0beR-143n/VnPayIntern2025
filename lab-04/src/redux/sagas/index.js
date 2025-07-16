import { all } from 'redux-saga/effects';
import authSaga from './authSaga';

// Root Saga: kết hợp tất cả các sagas lại
export default function* rootSaga() {
  yield all([
    authSaga(),
  ]);
}
