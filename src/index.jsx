import {StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import { CartProvider } from 'react-use-cart';
import { Provider } from "react-redux";
import App from './App.jsx'
import store from "./store/store";
import * as serviceWorker from './serviceWorker';
import './lib/i18n';
import './styles/index.css'
import './styles/globals.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
      <CartProvider>
          <App />
      </CartProvider>
      </Provider>
  </StrictMode>,
)

serviceWorker.unregister();
