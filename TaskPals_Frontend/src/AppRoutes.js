import HomePage from './HomePage';
import Legal from './Legal';
import DoNotSellMyInfoPage from "./DoNotSellMyInfo";
import Terms from "./TermsAndPrivacy";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import './App.css';
import ServicePage from "./ServicePage";
import Auth from "./Auth";
import CustomerProfile from "./CustomerProfile";
import BookingForm from "./BookingForm";
import AboutUs from "./AboutUs"
import FormProvider from "./FormProvider"
import ContactUs from './ContactUs'
import Reviews from './Reviews'
import AboutUs from "./AboutUs";
import FormProvider from "./FormProvider";
import ProviderProfile from "./ProviderProfile";
import ProviderProfile2 from './ProviderProfile2';

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
        <Route path="/service/:serviceId" element={<ServicePage/>}/> 
        <Route path="/Book" element={<BookingForm/>}/>
        <Route path="/profile" element={isLoggedIn ?<CustomerProfile />:<Navigate to = '/login' />}/>
        <Route path= '*' element={<Navigate to = '/'/>}/>
          <Route path="/service/:serviceId" element={<ServicePage/>}/> 
            <Route path="/Book" element={<BookingForm/>}/>
            {isLoggedIn ? (
              <Route path="/profile" element={<CustomerProfile />} />
            ) : (
              <Route path="/login" element={<Auth />} /> // Redirect to Auth if not logged in
            )}
        { <Route path="/provider/:provider_id" element={<ProviderProfile/>}/> }
        { <Route path="/2" element={<ProviderProfile2/>}/> }
        { <Route path="/service/:serviceId" element={<ServicePage/>}/> }
      </Routes>
    </Router>
  );
}
export default AppRoutes;