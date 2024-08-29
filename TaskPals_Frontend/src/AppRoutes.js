import HomePage from './HomePage';
import Legal from './Legal';
import DoNotSellMyInfoPage from "./DoNotSellMyInfo";
import Terms from "./TermsAndPrivacy";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import './App.css';
import Auth from "./Auth";
import CustomerProfile from "./CustomerProfile";
import AboutUs from "./AboutUs"
import FormProvider from "./FormProvider"
import ContactUs from './ContactUs'
import Reviews from './Reviews'
import ProviderProfile from "./ProviderProfile";

function AppRoutes({ isLoggedIn }) { // Accept isLoggedIn as a prop
  return (
    <Router>
      <Routes>
        <Route path = '/' element={<HomePage/>}/>
        <Route path="/TermsAndPrivacy" element={<Terms/>} />
        <Route path="/DoNotSellMyInfo" element={<DoNotSellMyInfoPage/>} />
        <Route path="/Legal" element={<Legal/>} />
        <Route path="/AboutUs" element={<AboutUs/>}/>
        <Route path="/apply" element={<FormProvider/>}/>
        <Route path='/ContactUs' element={<ContactUs/>}/>
        <Route path='/reviews' element={<Reviews/>}/>
        <Route path="/login" element={isLoggedIn? <Navigate to = '/profile'/> : <Auth/>}/>
        <Route path="/profile" element={isLoggedIn ?<CustomerProfile />:<Navigate to = '/login' />}/>
        <Route path= '*' element={<Navigate to = '/'/>}/>
            {isLoggedIn ? (
              <Route path="/profile" element={<CustomerProfile />} />
            ) : (
              <Route path="/login" element={<Auth />} /> // Redirect to Auth if not logged in
            )}
        { <Route path="/provider/:provider_id" element={<ProviderProfile/>}/> }
      </Routes>
    </Router>
  );
}
export default AppRoutes;