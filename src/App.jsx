import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';

// Import Components
const Loading = lazy(() => import('./components/Loading/Loading'));
const ScrollToTop = lazy(() => import('./components/ScrollToTop'));

// Import Routes
import Home from './routes/Home/Home';

// App Router Configuration
const routeConfig = [
    {
        path: '/',
        element: <Home />
    },
]

// App Content Component
const AppContent = () => {

    return (
        <>
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
