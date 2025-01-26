import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'; 

import Home from './pages/Home';
import Sample from './pages/Sample';

const Cookies = lazy(() => import('./components/Cookies'));  

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
                <div className="page-view">
                  <Routes>
                    <Route path="/" element={<Home />} />
                      <Route path="/sample" element={<Sample />} />
                    <Route path="*" element={<Home />} />
                  </Routes>  
                </div> 
            </Router>  
      </Suspense>
    </HelmetProvider>
  );
};

export default App;
