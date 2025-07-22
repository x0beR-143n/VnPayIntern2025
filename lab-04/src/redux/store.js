import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Mặc định là localStorage cho web

import authReducer from './slices/authSlice';
import languageReducer from  './slices/languageSlice'
import rootSaga from './sagas'; // Import root saga

// Cấu hình Redux Persist
const persistConfig = {
  key: 'root', // Key cho localStorage, có thể là bất cứ gì
  storage,     // Cơ chế lưu trữ, ở đây là localStorage
  whitelist: ['auth', 'language'], // Chỉ lưu trữ slice được khai báo. Các slice khác sẽ không được persist.
  // blacklist: ['someOtherSlice'] // Nếu muốn loại trừ một slice nào đó
};

// Kết hợp các reducers
const rootReducer = combineReducers({
  auth: authReducer,
  language: languageReducer,
});

// Bọc rootReducer với persistReducer
// Tạo ra một reducer mới có khả năng lưu và tải trạng thái.
// Khi trạng thái thay đổi, persistedReducer sẽ kích hoạt quá trình lưu trữ.
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Tạo Saga Middleware
const sagaMiddleware = createSagaMiddleware();

// Cấu hình Store
export const store = configureStore({
  reducer: persistedReducer, 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Bỏ qua các action types của redux-persist để tránh cảnh báo serializable check
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware), // Thêm sagaMiddleware vào danh sách middleware
});

sagaMiddleware.run(rootSaga);

// Tạo persistor object để tích hợp với PersistGate
// Dòng này khởi tạo quá trình persist. Nó bắt đầu lắng nghe các thay đổi của store và lưu chúng vào storage (localStorage).
export const persistor = persistStore(store);
