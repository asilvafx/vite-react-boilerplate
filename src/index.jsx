import {StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import * as serviceWorker from './serviceWorker';
import './lib/i18n';
import './styles/index.css'
import './styles/globals.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

serviceWorker.unregister();
