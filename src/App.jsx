/*
    Import Global
*/
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

/*
    Import Pages
*/
import Home from './pages/Home';
const Sample = lazy(() => import('./pages/Sample'));

/*
    Import Components
*/
const Cookies = lazy(() => import('./components/Cookies'));

/*
    Load App Router
*/
const App = () => {    
 
  return (
    <HelmetProvider> 
      <Suspense fallback={<div id="loading">Loading...</div>}> 
            <Router 
                future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
                }} >    
              <Cookies />
              <Toaster />
              <Routes>
                <Route path="/" element={<Home />} />
                  <Route path="/sample" element={<Sample />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </Router>  
      </Suspense>
    </HelmetProvider>
  );
};

export default App;
