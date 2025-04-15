import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { checkAuthStatus } from './store/slices/authSlice';

// Private routes components
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Lazily loaded components
const Loading = lazy(() => import('./components/Loading'));
const ScrollToTop = lazy(() => import('./components/ScrollToTop'));
const CookiesGDPR = lazy(() => import('./components/Cookies'));

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Logout from './pages/auth/Logout';

// Route Configuration
const routeConfig = [
    // Public Routes with Navbar and Footer
    {
        path: '/',
        element: <Home />,
        showNavAndFooter: true
    },

    // Auth Routes without Navbar and Footer
    {
        path: '/auth',
        element: <Login />,
        showNavAndFooter: false
    },
    {
        path: '/register',
        element: <Register />,
        showNavAndFooter: false
    },
    {
        path: '/logout',
        element: <Logout />,
        showNavAndFooter: false
    },

    // Protected Routes without Navbar and Footer
    {
        path: '/dashboard',
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
        showNavAndFooter: false
    },

    // Admin Routes
    {
        path: '/admin',
        element: <ProtectedRoute><AdminRoute><Admin /></AdminRoute></ProtectedRoute>,
        showNavAndFooter: false
    }
];


// App Content Component
const AppContent = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    // Check authentication status on app initialization
    useEffect(() => {
        dispatch(checkAuthStatus());
    }, [dispatch]);

    // Find current route config
    const currentRoute = routeConfig.find(route => {
        // Handle exact paths and parameterized paths
        if (route.path.includes(':')) {
            const pathPattern = new RegExp(
                `^${route.path.replace(/:[^/]+/g, '[^/]+')}$`
            );
            return pathPattern.test(location.pathname);
        }
        return route.path === location.pathname;
    });

    // Default to showing nav/footer if route not found
    const shouldShowNavAndFooter = currentRoute?.showNavAndFooter ?? true;

    return (
        <>
            <ScrollToTop />
            <Toaster toastOptions={{
                className: '!text-neutral-200 !bg-neutral-950 premium-border',
                success: {
                    className: '!text-green-200 !bg-neutral-900 premium-border',
                },
                error: {
                    className: '!text-red-200 !bg-neutral-900 premium-border',
                },
            }} />
            <CookiesGDPR />

            {shouldShowNavAndFooter && <div id="navbar" />}

            <Routes>
                {routeConfig.map(route => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                    />
                ))}
                {/* Catch-all route */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>

            {shouldShowNavAndFooter && <div id="footer"/> }
        </>
    );
};

// Main App Component
const App = () => {
    return (
        <HelmetProvider>
            <Suspense fallback={<Loading />}>
                <Router>
                    <AppContent />
                </Router>
            </Suspense>
        </HelmetProvider>
    );
};

export default App;