import React, {lazy} from 'react';

// Import Routes
const Home = lazy(() => import('./routes/Home/Home'));
const Shop = lazy(() => import('./routes/Shop/Shop'));
const Cart = lazy(() => import('./routes/Shop/Cart'));
const Auth = lazy(() => import('./routes/Auth/Auth'));
const Logout = lazy(() => import('./routes/Auth/Logout'));

// App Router Configuration
const routeConfig = [
    {
        path: '/',
        element: <Home />
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
        path: '/auth',
        element: <Auth />
    },
    {
        path: '/logout',
        element: <Logout />
    },
]

export default routeConfig;