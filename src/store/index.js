import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { CookieStorage } from 'redux-persist-cookie-storage';
import Cookies from 'js-cookie';
import authReducer from './slices/authSlice';

const cookieOptions = {
    expiration: {
        default: 30 * 24 * 60 * 60
    },
    setCookieOptions: {
        path: '/',
        secure: true,
        sameSite: 'strict',
        httpOnly: true,
        domain: window.location.hostname
    }
};

const cookieStorage = new CookieStorage(Cookies, cookieOptions);

const persistConfig = {
    key: 'root',
    storage: cookieStorage,
    whitelist: ['auth']
};

const rootReducer = combineReducers({
    auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
});

export const persistor = persistStore(store);
