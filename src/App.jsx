import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { checkLoginStatus, getUserData, updateData } from './lib/user';
import AuthProvider from "./context/AuthProvider";
import { UserProvider } from './context/UserProvider';
import UserUpdater from './context/UserUpdater';
import SiteUpdater from './context/SiteUpdater';

/*
    Import Pages
*/
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
const Contacts = lazy(() => import('./pages/Contacts'));
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
        async function fetchLoginStatus() {
            const isLoggedIn = await checkLoginStatus();
            if (isLoggedIn) {
                const userData = await getUserData();
                if(userData){
                await updateData(userData);
                }
            }
        }
        fetchLoginStatus();
    }, []);

    return (
        <HelmetProvider>
            <Suspense fallback={<div id="loading">Loading...</div>}>
                <Router>
                    <ScrollToTop />
                    <UserProvider>
                    <AuthProvider>
                    <UserUpdater />
                    <SiteUpdater />
                    <Toaster />
                        <CookiesGDPR />
                        <div className="aurora"></div>
                        <div className="aurora"></div>
                        <div className="aurora"></div>
                        <div className="aurora"></div>

                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route element={<PrivateRoute />}>
                                <Route path="/contacts" element={<Contacts />} />
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
                    </UserProvider>
                </Router>
            </Suspense>
        </HelmetProvider>
    );
};

export default App;