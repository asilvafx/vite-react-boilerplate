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
    Import Components
*/
const Loading = lazy(() => import('./components/Loading'));
const BackgroundVideo = lazy(() => import('./components/BackgroundVideo'));
const ScrollToTop = lazy(() => import('./components/ScrollToTop'));
const CookiesGDPR = lazy(() => import('./components/Cookies'));
const PrivateRoute = lazy(() => import('./components/PrivateRoute'));


/*
    Import Pages
*/
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
const AviatorGame = lazy(() => import('./pages/AviatorGame'));
const Invites = lazy(() => import('./pages/Invites'));
const Join = lazy(() => import('./pages/Join'));
const Create = lazy(() => import('./pages/Create'));
const Chests = lazy(() => import('./pages/Chests'));
const Transactions = lazy(() => import('./pages/Transactions'));
const Account = lazy(() => import('./pages/Account'));
const Contacts = lazy(() => import('./pages/Contacts'));
const Buy = lazy(() => import('./pages/Buy'));
const Receive = lazy(() => import('./pages/Receive'));
const Exchange = lazy(() => import('./pages/Exchange'));
const Send = lazy(() => import('./pages/Send'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword'));
const Logout = lazy(() => import('./pages/auth/Logout'));

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
                    <UserProvider>
                        <AuthProvider>
                            <UserUpdater/>
                            <SiteUpdater/>
                            <CookiesGDPR/>


                            <BackgroundVideo />
                            <div className="aurora"></div>
                            <div className="aurora"></div>
                            <div className="aurora"></div>
                            <div className="aurora"></div>

                            <Routes>
                                <Route path="/" element={<Home/>}/>
                                <Route element={<PrivateRoute/>}>

                                    <Route path="/games/aviator" element={<AviatorGame/>}/>
                                    <Route path="/join/:id" element={<Join/>}/>
                                    <Route path="/create" element={<Create/>}/>
                                    <Route path="/chests" element={<Chests/>}/>
                                    <Route path="/invites" element={<Invites/>}/>
                                    <Route path="/transactions" element={<Transactions/>}/>
                                    <Route path="/account" element={<Account/>}/>
                                    <Route path="/contacts" element={<Contacts/>}/>
                                    <Route path="/buy" element={<Buy/>}/>
                                    <Route path="/receive" element={<Receive/>}/>
                                    <Route path="/exchange" element={<Exchange/>}/>
                                    <Route path="/send" element={<Send/>}/>
                                    <Route path="/send/:address" element={<Send/>}/>
                                    <Route path="/dashboard" element={<Dashboard/>}/>
                                    <Route path="/logout" element={<Logout/>}/>
                                </Route>
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/register" element={<Register/>}/>
                                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                                <Route path="/reset-password" element={<ResetPassword/>}/>
                                <Route path="*" element={<Home/>}/>
                            </Routes>

                        </AuthProvider>
                    </UserProvider>
                </Router>
            </Suspense>
        </HelmetProvider>
    );
};

export default App;