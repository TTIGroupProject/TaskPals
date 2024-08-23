import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ServicePage from './ServicePage';
import Auth from './Auth';
import CustomerProfile from './CustomerProfile';

function AppRoutes({ isLoggedIn }) { // Accept isLoggedIn as a prop
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home/>}/> */}
        <Route path="/service/:serviceId" element={<ServicePage />} />
        <Route path="/login" element={<Auth />} />
        {isLoggedIn ? (
          <Route path="/profile" element={<CustomerProfile />} />
        ) : (
          <Route path="/login" element={<Auth />} /> // Redirect to Auth if not logged in
        )}
      </Routes>
    </Router>
  );
}

export default AppRoutes;