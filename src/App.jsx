import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { checkLoginStatus } from './lib/user';
import AuthProvider from "./context/AuthProvider";
import Cookies from 'js-cookie';

/*
    Import Pages
*/
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
const Receive = lazy(() => import('./pages/Receive'));
const Exchange = lazy(() => import('./pages/Exchange'));
const Send = lazy(() => import('./pages/Send'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword'));
const Logout = lazy(() => import('./pages/auth/Logout'));

/*
    Import Components
*/

import ScrollToTop from './components/ScrollToTop';
const CookiesGDPR = lazy(() => import('./components/Cookies'));
const PrivateRoute = lazy(() => import('./components/PrivateRoute'));

/*
    Load App Router
*/
const App = () => {
    useEffect(() => {

        const isLoggedIn = checkLoginStatus();
        if (!isLoggedIn) {
            Cookies.remove('isLoggedIn');
            Cookies.remove('uData');
            Cookies.remove('tkn');
        }
    }, []); // Empty dependency array to run only once on mount

    return (
        <HelmetProvider>
            <Suspense fallback={<div id="loading">Loading...</div>}>
                <Router
                    future={{
                        v7_startTransition: true,
                        v7_relativeSplatPath: true,
                    }} >
                    <ScrollToTop>
                    <Toaster />
                    <AuthProvider>
                        <CookiesGDPR />
                        <div className="aurora"></div>
                        <div className="aurora"></div>
                        <div className="aurora"></div>
                        <div className="aurora"></div>

                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route element={<PrivateRoute />}>
                                <Route path="/receive" element={<Receive />} />
                                <Route path="/exchange" element={<Exchange />} />
                                <Route path="/send" element={<Send />} />
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/logout" element={<Logout />} />
                            </Route>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />
                            <Route path="/reset-password" element={<ResetPassword />} />
                            <Route path="*" element={<Home />} />
                        </Routes>
                    </AuthProvider>
                    </ScrollToTop>
                </Router>
            </Suspense>
        </HelmetProvider>
    );
};

export default App;