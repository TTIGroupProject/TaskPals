import React, {useState} from "react";
import './HomePage.css'

const Footer = () => {

  const [subscribe, setSubscribe]= useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubscribe(true)
  };

  return(
    <footer className="bg-custom-gray footer">
      <div className="container">
      <div className="row align-items-center">
      <div className="col-md-4">
      <ul className="list-unstyled">
        <li><a className="text-decoration-none text-dark" href="#">About Us</a></li>
        <li><a className="text-decoration-none text-dark" href="#">Reviews</a></li>
        <li><a className="text-decoration-none text-dark" href="#">Contact Us</a></li>
      </ul>
      </div>
      <div className="col-md-4">
      <ul className="list-unstyled">
        <li><a className="text-decoration-none text-dark" href="/TermsAndPrivacy">Terms & Privacy</a></li>
        <li><a className="text-decoration-none text-dark" href="/DoNotSellMyInfo">Do Not Sell My Personal Information</a></li>
        <li><a className="text-decoration-none text-dark" href="/Legal">Legal</a></li>
      </ul>
      </div>
    

      <div className="col-md-4">
      <div className="subscription-form">
        {!subscribe ? (
          <>
        <p>Subscribe to hear about new services and household tips:</p>
        <form className="d-flex" onSubmit={handleSubmit}>
              <input
                type="email"
                className="form-control me-2 "
                id="email"
                placeholder="Enter your email"
                required
              />
              <button type="submit" className="btn btn-dark">
                Subscribe
              </button>
        </form>
        </>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px' }}>
          <p>Thank You for Subscribing!</p>
        </div>
        )}
      </div>
      </div>
      </div><br/><br/>
    <p className="text-center mt-3">© 2024 TaskPals. All rights reserved.</p>
    </div>
    </footer>

  )
}

export default Footer