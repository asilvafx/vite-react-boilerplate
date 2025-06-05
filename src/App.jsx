import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import routeConfig from '/routeConfig';

// Import Components
const Loading = lazy(() => import('./components/Loading'));
const ScrollToTop = lazy(() => import('./components/ScrollToTop'));

// App Content Component
const AppContent = () => {

    return (
        <>
            <Suspense fallback={<Loading />}>
                <ScrollToTop />
                <Toaster toastOptions={{
                    className: '',
                    success: {
                        className: '',
                    },
                    error: {
                        className: '',
                    },
                }} />

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
            </Suspense>
        </>
    );
};

function App() {

    return (
        <HelmetProvider>
            <Suspense fallback={<Loading />}>
                <Router>
                    <AppContent />
                </Router>
            </Suspense>
        </HelmetProvider>
    )
}

export default App
