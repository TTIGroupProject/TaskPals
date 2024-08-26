import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import HomePage from './HomePage';
import Legal from './Legal';
import DoNotSellMyInfoPage from "./DoNotSellMyInfo";
import Terms from "./TermsAndPrivacy";
import ServicePage from "./ServicePage";

function AppRoutes() {
  return (
        <Router>
        <Routes>
          <Route path = '/' element={<HomePage/>}/>
          <Route path="/TermsAndPrivacy" element={<Terms/>} />
          <Route path="/DoNotSellMyInfo" element={<DoNotSellMyInfoPage/>} />
          <Route path="/Legal" element={<Legal/>} />
          <Route path="/service/:serviceId" element={<ServicePage/>}/> 
        </Routes>
      </Router>
  );
}

export default AppRoutes;
