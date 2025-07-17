import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/index.css'
import './style/common/theme.css'
import './style/common/display.css'
import './style/common/margin.css'
import './style/common/padding.css'
import './style/common/position.css'
import './style/common/text.css'
import './style/common/width-height.css'
import './style/common/background.css'
import './style/common/image.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store.js'
import React from 'react'
import { PersistGate } from 'redux-persist/integration/react';
import './i18n'; // import để i18n hoạt động

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* PersistGate sẽ trì hoãn render UI cho đến khi trạng thái được khôi phục từ storage */}
      {/* loading={null} có nghĩa là không hiển thị gì trong khi chờ đợi */}
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
