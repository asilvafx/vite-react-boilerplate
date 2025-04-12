import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { checkAuthStatus } from './store/slices/authSlice';
import Cookies from 'js-cookie';

const Loading = lazy(() => import('./components/Loading'));
const ScrollToTop = lazy(() => import('./components/ScrollToTop'));
const CookiesGDPR = lazy(() => import('./components/Cookies'));

// Pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Logout from './pages/auth/Logout';
import AdminDashboard from './pages/admin/Dashboard';
import Shop from './pages/shop/Shop';
import Cart from './pages/shop/Cart';
import Checkout from './pages/shop/Checkout';

// Protected Route Components
const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = React.useState(true);
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const authStatus = await dispatch(checkAuthStatus());


                setIsAuthenticated(authStatus);
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        verifyAuth();
    }, [dispatch]);

    if (isLoading) {
        return <Loading />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};

const AdminRoute = ({ children }) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = React.useState(true);
    const [isAdmin, setIsAdmin] = React.useState(false);

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const authStatus = await dispatch(checkAuthStatus());

                // Get user data from cookies
                const userData = JSON.parse(Cookies.get('userData') || '{}');

                setIsAdmin(authStatus && userData.isAdmin);
            } catch (error) {
                setIsAdmin(false);
            } finally {
                setIsLoading(false);
            }
        };

        verifyAuth();
    }, [dispatch]);

    if (isLoading) {
        return <Loading />;
    }

    if (!isAdmin) {
        return <Navigate to="/" />;
    }

    return children;
};

const App = () => {
    const dispatch = useDispatch();

    // Check authentication status on app initialization
    useEffect(() => {
        dispatch(checkAuthStatus());
    }, [dispatch]);

    return (
        <HelmetProvider>
            <Suspense fallback={<Loading />}>
                <Router>
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
                    <CookiesGDPR/>

                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/shop" element={<Shop />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />

                        {/* Protected Routes */}
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <Home />
                                </ProtectedRoute>
                            }
                        />

                        {/* Admin Routes */}
                        <Route
                            path="/admin"
                            element={
                                <ProtectedRoute>
                                    <AdminRoute>
                                        <AdminDashboard />
                                    </AdminRoute>
                                </ProtectedRoute>
                            }
                        />

                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </Router>
            </Suspense>
        </HelmetProvider>
    );
};

export default App;
