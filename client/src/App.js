import React from 'react';
import {BrowserRouter, Routes, Route, } from 'react-router-dom'
import { LoadScript } from "@react-google-maps/api";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import ContactUs from './pages/ContactUs';
import LandlordLogin from './components/LandlordLogin';
import LandlordSignup from './components/LandlordSignup';
import PropertyContainer from './components/PropertyContainer';
import PropertyPage from './pages/PropertyPage';
import TenantPage from './pages/TenantPage';
import TenantLogin from './components/TenantLogin';


function App() {

  return (
    <>
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <Navbar />
        {/* <BrowserRouter> */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/contact-us' element={<ContactUs />} />
            <Route exact path='/all-properties' element={<PropertyContainer />} />
            <Route path='/properties/:id' element={<PropertyPage />} />
            <Route path='/tenants/my-page' element={<TenantPage />} />
            <Route path='/tenants/login'  element={<TenantLogin />} />
          </Routes>
        {/* </BrowserRouter> */}
        <Footer />
      </LoadScript>
    </>
  );
}

export default App;
