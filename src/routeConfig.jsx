import React, {lazy, useEffect} from 'react';
import ProtectedRoute from './components/ProtectedRoute';

// Import Routes
const Home = lazy(() => import('./routes/Home/Home'));
const Private = lazy(() => import('./routes/Home/Private'));
const Shop = lazy(() => import('./routes/Shop/Shop'));
const Cart = lazy(() => import('./routes/Shop/Cart'));
const Checkout = lazy(() => import('./routes/Shop/Checkout'));
const PaymentSuccess = lazy(() => import('./routes/Shop/PaymentSuccess'));
const Auth = lazy(() => import('./routes/Auth/Auth'));
const ForgotPassword = lazy(() => import('./routes/Auth/ForgotPassword'));
const Logout = lazy(() => import('./routes/Auth/Logout'));
const GitHubCallback = lazy( () => import('./components/GitHubCallback'));
// App Router Configuration
const routeConfig = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/private',
        element: <ProtectedRoute><Private /></ProtectedRoute>
    },
    {
        path: '/shop',
        element: <Shop />
    },
    {
        path: '/cart',
        element: <Cart />
    },
    {
        path: '/checkout',
        element: <Checkout />
    },
    {
        path: '/payment-success/:id',
        element: <PaymentSuccess />
    },
    {
        path: '/auth',
        element: <Auth />
    },
    {
        path: '/auth/github/callback',
        element: <GitHubCallback />
    },
    {
        path: '/forgot',
        element: <ForgotPassword />
    },
    {
        path: '/logout',
        element: <Logout />
    },
]

export default routeConfig;