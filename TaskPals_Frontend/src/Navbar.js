import React from "react";
import './Navbar.css'
// import FormProviderService from './FormProviderservice';


const Navbar = () => {
  return(
        <nav className="navbar navbar-expand-lg navbar-light bg-white navbarPadding">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              <img 
                src="taskpals_logo.jpg" 
                alt="Logo" 
                className="navbarheight"
              />
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link text-decoration-underline" href="/login">Sign in</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-decoration-underline" href='/apply'>Become a TaskPal</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      );
    };

export default Navbar;