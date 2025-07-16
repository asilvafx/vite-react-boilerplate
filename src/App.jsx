import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import routeConfig from '/routeConfig';

// Import Components
const Loading = lazy(() => import('./components/Loading.jsx'));
const ScrollToTop = lazy(() => import('./components/ScrollToTop.jsx'));
const AnimatedToaster = lazy(() => import('./components/Common/AnimatedToaster'));

// App Content Component
const AppContent = () => {

    return (
        <>
            <Suspense fallback={<Loading />}>
                <ScrollToTop />
                <AnimatedToaster />

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
