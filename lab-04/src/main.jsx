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

createRoot(document.getElementById('root')).render(
  <StrictMode>  
    <App />
  </StrictMode>,
)
