import React from 'react'
import ReactDOM from 'react-dom/client'

import { CartProvider } from 'react-use-cart'
import { Provider } from 'react-redux'

import App from './App'

import './lib/i18n';
import './styles/index.css'
import './styles/custom.css'

import { store } from './providers/index.js'

import * as serviceWorker from './serviceWorker'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
      <CartProvider>
          <App />
      </CartProvider>
      </Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();