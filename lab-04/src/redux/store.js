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
import rootSaga from './sagas'; // Import root saga của bạn

// 1. Cấu hình Redux Persist
const persistConfig = {
  key: 'root', // Key cho localStorage, có thể là bất cứ gì
  storage,     // Cơ chế lưu trữ, ở đây là localStorage
  whitelist: ['auth', 'language'], // Chỉ lưu trữ slice 'auth'. Các slice khác sẽ không được persist.
  // blacklist: ['someOtherSlice'] // Nếu bạn muốn loại trừ một slice nào đó
};

// 2. Kết hợp các reducers
const rootReducer = combineReducers({
  auth: authReducer,
  language: languageReducer,
});

// 3. Bọc rootReducer với persistReducer
// Dòng này tạo ra một reducer mới có khả năng lưu và tải trạng thái.
// Khi trạng thái thay đổi, persistedReducer sẽ kích hoạt quá trình lưu trữ.
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Tạo Saga Middleware
const sagaMiddleware = createSagaMiddleware();

// 5. Cấu hình Store
export const store = configureStore({
  reducer: persistedReducer, // Sử dụng reducer đã được bọc bởi persistReducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Bỏ qua các action types của redux-persist để tránh cảnh báo serializable check
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware), // Thêm sagaMiddleware vào danh sách middleware
});

// 6. Chạy các Sagas
sagaMiddleware.run(rootSaga);

// 7. Tạo persistor object để tích hợp với PersistGate
// Dòng này khởi tạo quá trình persist. Nó bắt đầu lắng nghe các thay đổi của store
// và lưu chúng vào storage (localStorage trong trường hợp này).
export const persistor = persistStore(store);
