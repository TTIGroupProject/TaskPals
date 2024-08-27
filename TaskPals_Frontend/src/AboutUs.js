import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './button.css'; // Assuming you have custom styles in this file
import { FaSearch, FaLink, FaCalendarAlt, FaSmileBeam, FaShieldAlt } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="container my-5 no-top-padding">
      <header className="text-center mb-4">
        <h1 className="display-4 caveat-font mb-3">About Us</h1>
        <p className="lead text-muted">
          Welcome to TaskPals – Get Hired, Get Help – All in a Click!
        </p>
      </header>

      <section className="mb-5">
        <h2 className="display-5 caveat-font mb-4">Who We Are</h2>
        <div className="card shadow-sm">
          <div className="card-body">
            <p>
              TaskPals is more than just a service – it’s a vibrant community where dedicated professionals and valued clients come together to create a hassle-free home environment. We meticulously vet and select our helpers to ensure they are trustworthy, skilled, and committed to delivering exceptional service. Our team is passionate about making your everyday tasks less daunting, so you can focus on what truly matters to you.
            </p>
            <p>
              But that’s not all – TaskPals also offers exciting job opportunities for skilled professionals looking to join our network. Whether you’re a handyman, electrician, plumber, or another service provider, we invite you to apply and become part of our trusted team. We’re always on the lookout for talented individuals who are enthusiastic about providing top-notch service and making a difference in our clients' lives.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <h2 className="display-5 caveat-font mb-4">What We Do</h2>
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <FaSearch size={40} style={{ color: 'rgb(245, 91, 116)' }} className="mb-3" />
                <h4 className="card-title">Browse</h4>
                <p className="card-text">Explore our wide range of services and find the perfect helper for your needs.</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <FaLink size={40} style={{ color: 'rgb(245, 91, 116)' }} className="mb-3" />
                <h4 className="card-title">Connect</h4>
                <p className="card-text">Use our easy-to-navigate platform to communicate directly with potential helpers.</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <FaCalendarAlt size={40} style={{ color: 'rgb(245, 91, 116)' }} className="mb-3" />
                <h4 className="card-title">Schedule</h4>
                <p className="card-text">Arrange a time that works best for you and your helper.</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <FaSmileBeam size={40} style={{ color: 'rgb(245, 91, 116)' }} className="mb-3" />
                <h4 className="card-title">Relax</h4>
                <p className="card-text">Enjoy a clean, organized, and stress-free home!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-5 text-center">
        <h2 className="display-5 caveat-font mb-4">Our Promise</h2>
        <div className="card mx-auto" style={{ maxWidth: '600px' }}>
          <div className="card-body text-center">
            <FaShieldAlt size={40} style={{ color: 'rgb(245, 91, 116)' }} className="mb-3" />
            <p>
              At TaskPals, we are committed to excellence and reliability. Our team strives to exceed your expectations with every task completed. We value open communication, professionalism, and a strong work ethic, ensuring you receive the highest quality service every time.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center mb-5">
        <h2 className="display-5 caveat-font mb-4">Get Started</h2>
        <p className="mb-4">
          Ready to take the first step towards a more manageable and enjoyable home life? Join the TaskPals community today and discover how easy it is to find the right help for your household needs.
        </p>
        <p className="mb-4">
          Thank you for choosing TaskPals – your trusted partner in everyday tasks!
        </p>
      </section>

      <section id="contact" className="text-center mb-5">
        <h2 className="display-5 caveat-font mb-4">Contact Us</h2>
        <p>
          Have questions or need assistance? Feel free to reach out to our friendly support team <a href="/ContactUs" className="text-primary">here</a>. We’re here to help!
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
