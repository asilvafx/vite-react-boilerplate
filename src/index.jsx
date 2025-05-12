import {StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import { CartProvider } from 'react-use-cart';
import App from './App.jsx'
import * as serviceWorker from './serviceWorker';
import './lib/i18n';
import './styles/index.css'
import './styles/globals.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <CartProvider>
          <App />
      </CartProvider>
  </StrictMode>,
)

serviceWorker.unregister();
