/*
    Import Global
*/
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
const TreasureHunt = lazy(() => import('./pages/TreasureHunt'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Account = lazy(() => import('./pages/Account'));
const Chests = lazy(() => import('./pages/Chests'));
const Create = lazy(() => import('./pages/Create'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword'));
const Logout = lazy(() => import('./pages/auth/Logout'));

/*
    Import Components
*/
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
            Cookies.remove('tkn');}
    }, );

      return (
        <HelmetProvider>
          <Suspense fallback={<div id="loading">Loading...</div>}>
                <Router
                    future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true,
                    }} >
                  <Toaster />
                  <AuthProvider>
                  <CookiesGDPR />
                  <Routes>
                      <Route path="/" element={<Home />} />
                      <Route element={<PrivateRoute />}>
                          <Route path="/treasure-hunt/:id" element={<TreasureHunt />} />
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/account" element={<Account />} />
                          <Route path="/create" element={<Create />} />
                          <Route path="/chests" element={<Chests />} />
                          <Route path="/logout" element={<Logout />} />
                      </Route>
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/forgot-password" element={<ForgotPassword />} />
                      <Route path="/reset-password" element={<ResetPassword />} />
                      <Route path="*" element={<Home />} />
                  </Routes> 
                  </AuthProvider>
                </Router>
          </Suspense>
        </HelmetProvider>
      );
};

export default App;
