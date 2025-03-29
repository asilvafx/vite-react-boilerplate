import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

/*
    Import Components
*/
const Loading = lazy(() => import('./components/Loading'));
const ScrollToTop = lazy(() => import('./components/ScrollToTop'));
const CookiesGDPR = lazy(() => import('./components/Cookies'));

/*
    Import Pages
*/
import Home from './pages/Home';

/*
    Load App Router
*/
const App = () => {

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
                        <Route path="/" element={<Home/>}/>
                        <Route path="*" element={<Home/>}/>
                    </Routes>
                </Router>
            </Suspense>
        </HelmetProvider>
    );
};

export default App;