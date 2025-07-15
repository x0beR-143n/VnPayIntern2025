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
import { store } from './redux/store.js'
import React from 'react'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
