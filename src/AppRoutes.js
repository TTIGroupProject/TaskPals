import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AboutUs from './AboutUs';
import FormProvider from './FormProviders';
import 'bootstrap/dist/css/bootstrap.min.css';


function AppRoutes() {
  return (
    
            <Router>
                <Routes>
                    <Route path="/" element={<AboutUs />} />
                    <Route path="/apply" element={<FormProvider />} />
                </Routes>
            </Router>
        );
    }
    
export default AppRoutes;
