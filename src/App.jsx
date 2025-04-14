import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { checkAuthStatus } from './store/slices/authSlice';
import Cookies from 'js-cookie';

// Lazily loaded components
const Loading = lazy(() => import('./components/Loading'));
const ScrollToTop = lazy(() => import('./components/ScrollToTop'));
const CookiesGDPR = lazy(() => import('./components/Cookies'));

// Eagerly loaded components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

// Pages
import LogoutPage from './pages/LogoutPage';
import Cart from './pages/shop/Cart';
import Checkout from './pages/shop/Checkout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import AdministrationPage from './pages/AdministrationPage';
import SearchResultsPage from './pages/SearchResultsPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import AddTagPage from './pages/AddTagPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import ShippingAndReturnsPage from './pages/ShippingAndReturnsPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import CookiePolicyPage from './pages/CookiePolicyPage';

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
        return <Navigate to="/auth" />;
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

// Route Configuration
const routeConfig = [
    // Public Routes with Navbar and Footer
    {
        path: '/',
        element: <HomePage />,
        showNavAndFooter: true
    },
    {
        path: '/products',
        element: <ProductsPage />,
        showNavAndFooter: true
    },
    {
        path: '/product/:id',
        element: <ProductDetailPage />,
        showNavAndFooter: true
    },
    {
        path: '/search',
        element: <SearchResultsPage />,
        showNavAndFooter: true
    },
    {
        path: '/about',
        element: <AboutPage />,
        showNavAndFooter: true
    },
    {
        path: '/support',
        element: <ContactPage />,
        showNavAndFooter: true
    },
    {
        path: '/faq',
        element: <FAQPage />,
        showNavAndFooter: true
    },
    {
        path: '/shipping-returns',
        element: <ShippingAndReturnsPage />,
        showNavAndFooter: true
    },
    {
        path: '/terms-of-service',
        element: <TermsOfServicePage />,
        showNavAndFooter: true
    },
    {
        path: '/privacy-policy',
        element: <PrivacyPolicyPage />,
        showNavAndFooter: true
    },
    {
        path: '/cookie-policy',
        element: <CookiePolicyPage />,
        showNavAndFooter: true
    },
    {
        path: '/cart',
        element: <Cart />,
        showNavAndFooter: true
    },
    {
        path: '/checkout',
        element: <Checkout />,
        showNavAndFooter: true
    },

    // Auth Routes without Navbar and Footer
    {
        path: '/auth',
        element: <AuthPage />,
        showNavAndFooter: false
    },
    {
        path: '/logout',
        element: <LogoutPage />,
        showNavAndFooter: false
    },
    {
        path: '/forgot-password',
        element: <ForgotPasswordPage />,
        showNavAndFooter: false
    },
    {
        path: '/reset-password',
        element: <ResetPasswordPage />,
        showNavAndFooter: false
    },

    // Protected Routes without Navbar and Footer
    {
        path: '/dashboard',
        element: <ProtectedRoute><DashboardPage /></ProtectedRoute>,
        showNavAndFooter: false
    },
    {
        path: '/profile',
        element: <ProtectedRoute><ProfilePage /></ProtectedRoute>,
        showNavAndFooter: false
    },
    {
        path: '/add-tag',
        element: <ProtectedRoute><AddTagPage /></ProtectedRoute>,
        showNavAndFooter: false
    },

    // Admin Routes
    {
        path: '/admin',
        element: <ProtectedRoute><AdminRoute><AdministrationPage /></AdminRoute></ProtectedRoute>,
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

            {shouldShowNavAndFooter && <Navbar />}

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

            {shouldShowNavAndFooter && <Footer />}
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