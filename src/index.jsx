import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { CartProvider } from 'react-use-cart';
import { store, persistor } from './store';
import App from './App';
import Loading from './components/Loading';
import './lib/i18n';
import './styles/index.css';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import * as serviceWorker from './serviceWorker';

// Wrap the entire app with Suspense
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Suspense fallback={<Loading />}>
            <Provider store={store}>
                <PersistGate loading={<Loading />} persistor={persistor}>
                    <CartProvider>
                        <App />
                    </CartProvider>
                </PersistGate>
            </Provider>
        </Suspense>
        </ThemeProvider>
    </React.StrictMode>
);

serviceWorker.unregister();
