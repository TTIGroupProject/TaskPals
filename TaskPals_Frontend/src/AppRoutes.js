import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import AboutUs from "./AboutUs";
import FormProvider from "./FormProvider";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* { <Route path="/service/:serviceId" element={<ServicePage/>}/> } */}
        <Route path="/" element={<AboutUs/>}/>
        <Route path="/apply" element={<FormProvider/>}/>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
