import React, {lazy} from 'react';

// Import Routes
const Home = lazy(() => import('./routes/Home/Home'));

// App Router Configuration
const routeConfig = [
    {
        path: '/',
        element: <Home />
    },
]

export default routeConfig;