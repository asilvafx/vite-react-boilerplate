import React, {lazy, useEffect} from 'react';
import ProtectedRoute from './components/Common/ProtectedRoute.jsx';

// Import Routes
const Home = lazy(() => import('./routes/Sample/Home/Home'));
const Private = lazy(() => import('./routes/Sample/Home/Private'));
const Shop = lazy(() => import('./routes/Sample/Shop/Shop'));
const Cart = lazy(() => import('./routes/Sample/Shop/Cart'));
const Checkout = lazy(() => import('./routes/Sample/Shop/Checkout'));
const PaymentSuccess = lazy(() => import('./routes/Sample/Shop/PaymentSuccess'));
const Auth = lazy(() => import('./routes/Sample/Auth/Auth'));
const ForgotPassword = lazy(() => import('./routes/Sample/Auth/ForgotPassword'));
const Logout = lazy(() => import('./routes/Sample/Auth/Logout'));
const GitHubCallback = lazy( () => import('./components/Common/GitHubCallback.jsx'));
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