import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './HomePage';
import Legal from './Legal';
import DoNotSellMyInfoPage from "./DoNotSellMyInfo";
import Terms from "./TermsAndPrivacy";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path = '/' element={<HomePage/>}/>
        <Route path="/TermsAndPrivacy" element={<Terms/>} />
        <Route path="/DoNotSellMyInfo" element={<DoNotSellMyInfoPage/>} />
        <Route path="/Legal" element={<Legal/>} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
