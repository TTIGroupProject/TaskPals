import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ServicePage from "./ServicePage";
import Auth from "./Auth";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home/>}/> */}
        { <Route path="/service/:serviceId" element={<ServicePage/>}/> }
        { <Route path="/auth" element={<Auth/>}/> }
      </Routes>
    </Router>
  );
}

export default AppRoutes;
