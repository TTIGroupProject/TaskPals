import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ServicePage from "./ServicePage";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home/>}/> */}
        { <Route path="/service/:serviceId" element={<ServicePage/>}/> }
      </Routes>
    </Router>
  );
}

export default AppRoutes;
