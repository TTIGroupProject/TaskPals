import React, { useState, useEffect } from 'react';
import './HomePage.css';
import cleaning from './images/cleaning.jpg';
import landscaping from './images/gardener.jpg';
import plumbing from './images/plumbing.png';
import exterminator from './images/exterminator.jpg';
import handyman from './images/drill.jpg';
import moving from './images/moving.jpg';
import electricalWork from './images/electrician.jpg';
import painting from './images/paint.jpg';
import StarRating from './StarRating';

const HomePage = () => {
  const [reviews, setReviews] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedService, setSelectedService] = useState('');
  const [zipcode, setZipcode] = useState('');

  useEffect(() => {
    (function(d, m){
      var kommunicateSettings = {
        "appId": "314960aa0bca5101b2c8718bbbec660af",
        "popupWidget": true,
        "automaticChatOpenOnNavigation": true
      };
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      window.kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }, []);

  useEffect(() => {
    (async() => {
      try {
        // Fetch reviews
        const reviewResponse = await fetch('http://localhost:5000/reviews');
        if (!reviewResponse.ok) throw new Error('Network response was not ok');
        const reviewData = await reviewResponse.json();
        setReviews(reviewData);
        
        // Fetch customers
        const customerResponse = await fetch('http://localhost:5000/');
        if (!customerResponse.ok) throw new Error('Network response was not ok');
        const customerData = await customerResponse.json();
        setCustomers(customerData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Sort and prepare reviews with customer names
  const sortedReviews = reviews.sort((a, b) => b.rating - a.rating);
  const topReviews = sortedReviews.slice(0, 6);

  const reviewsWithCustomerNames = topReviews.map(review => {
    const customer = customers.find(c => c.customer_id === review.customer_id);
    return {
      ...review,
      name: customer ? customer.name : 'Anonymous Review'
    };
  });

  const isButtonEnabled = selectedService && zipcode;

  return (
    <div className='page-wrapper app-container'>
      <div className='container-fluid p-4'>
        <div className='text-center mb-4 font-edu'>
          <h1>Get Hired, <br/> Get Help—All in a Click</h1>
        </div>
        <div className='row align-items-center my-color justify-content-center bg-light rounded-3 p-3'>
          <div className='col-auto'>
            <div className='dropdown'>
              <button 
                className="btn dropdown-toggle fs-6 form-control"  
                type="button" 
                id="dropdownMenuButton" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
                style={{  
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #ced4da',
                  color: '#495057',
                  width: '225px'
                }}
              >
                {selectedService || 'What do you need done?'}
              </button>
              <ul className='dropdown-menu' aria-labelledby="dropdownMenuButton">
                <li><a href="#" className="dropdown-item d-flex justify-content-between align-items-center" onClick={() => setSelectedService('Cleaning')}>Cleaning<img src={cleaning} alt='cleaning supplies'/></a></li>
                <li><a href="#" className="dropdown-item d-flex justify-content-between align-items-center" onClick={() => setSelectedService('Landscaping')}>Landscaping<img src={landscaping} alt='garden tools'/></a></li>
                <li><a href="#" className="dropdown-item d-flex justify-content-between align-items-center" onClick={() => setSelectedService('Plumbing')}>Plumbing<img src={plumbing} alt='plumbing supplies'/></a></li>
                <li><a href="#" className="dropdown-item d-flex justify-content-between align-items-center" onClick={() => setSelectedService('Exterminator')}>Exterminator<img src={exterminator} alt='bug'/></a></li>
                <li><a href="#" className="dropdown-item d-flex justify-content-between align-items-center" onClick={() => setSelectedService('Handy Man')}>Handy Man<img src={handyman} alt='drill'/></a></li>
                <li><a href="#" className="dropdown-item d-flex justify-content-between align-items-center" onClick={() => setSelectedService('Moving')}>Moving<img src={moving} alt='moving truck'/></a></li>
                <li><a href="#" className="dropdown-item d-flex justify-content-between align-items-center" onClick={() => setSelectedService('Electrical work')}>Electrical Work<img src={electricalWork} alt='electrical supplies'/></a></li>
                <li><a href="#" className="dropdown-item d-flex justify-content-between align-items-center" onClick={() => setSelectedService('Painting')}>Painting<img src={painting} alt='paint supplies'/></a></li>
              </ul>
            </div>
          </div>
          <div className='col'>
            <div className='d-flex justify-content-center'>
              <input 
                style={{  
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #ced4da',
                  color: '#495057',
                  width: '200px'
                }}
                type='text' 
                id='zipcode' 
                className='form-control bg-light' 
                placeholder="Please enter the zipcode"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
              />
            </div>
          </div>
          <div className='col-auto'>
            <button 
              className='btn form-control buttonColor' 
              style={{  
                backgroundColor: '#f8f9fa',
                border: '1px solid #ced4da',
                color: 'black',
                width: '200px'
              }}
              disabled={!isButtonEnabled}
              onClick={() => {
                if (isButtonEnabled) {
                  alert(`Finding helpers for ${selectedService} in zipcode ${zipcode}`);
                }
              }}
            >
              Find Helper →
            </button>
          </div>
        </div>
      </div>
      <div className='container mt-5'>
        <h2 className='text-center caveat-font mb-4'>Hear from our happy customers</h2>
        {loading && <p>Loading reviews...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && reviewsWithCustomerNames.length === 0 && <p>No reviews available.</p>}
        {reviewsWithCustomerNames.length > 0 && (
          <div className='row'>
            {reviewsWithCustomerNames.map((review) => (
              <div key={review.id} className='col-md-4 mb-4'>
                <div className='card shadow-sm d-flex flex-column h-100'>
                  <div className='card-body'>
                    <h5 className='card-title'>{review.name}</h5>
                    <p className='card-text'>
                      <StarRating rating={review.rating} />
                    </p>
                    <p className='card-text'>{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
