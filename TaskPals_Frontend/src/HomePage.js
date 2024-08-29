import React, { useState, useEffect } from 'react';
import './HomePage.css'
import axios from 'axios'
import cleaning from './images/cleaning.jpg'
import landscaping from './images/gardener.jpg'
import plumbing from './images/plumbing.png'
import exterminator from './images/exterminator.jpg'
import handyman from './images/drill.jpg'
import moving from './images/moving.jpg'
import electricalWork from './images/electrician.jpg'
import painting from './images/paint.jpg'
import StarRating from './StarRating';
import { useNavigate } from 'react-router-dom';
import homePic from "./images/homePic.jpg";

const HomePage = () => {

  useEffect(() => {
    if(!document.getElementById('kommunicate-script')){
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
      s.id = 'kommunicate-script';
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      window.kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
    }
  }, []);
    
    


  const [selectedService, setSelectedService] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);

  const sortedReviews = reviews.sort((a, b) => b.rating - a.rating);
  const topReviews = sortedReviews.slice(0, 6);
  const navigate = useNavigate()

  const fetchProviders = async (service) => {
    setLoading(true);
    try{
      const { data } = await axios.get('http://127.0.0.1:5000/api/provider/', {
        params: {service_name: service}
      });
      setProviders(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }
  const isButtonEnabled = selectedService && zipcode;

  const handleFindHelper = () => {
    if (isButtonEnabled) {
      fetchProviders(selectedService);
    }
  };

  const ServiceMatch = providers.filter(provider => {
    const jobApplyingFor = provider.jobApplyingFor;
    if(typeof jobApplyingFor === 'string' && typeof selectedService === 'string') {
      return jobApplyingFor.toLowerCase().trim() === selectedService.toLowerCase().trim();
    }
    return false;
  })

  return (
    <div className='page-wrapper app-container'>
    <div className='container-fluid p-4'>
    <div className='container-fluid p-4 d-flex justify-content-center align-items-center'>
  <img src={homePic} alt='our team' className='img-fluid home-image' />
</div>
      <div className='text-center mb-4 font-edu'>
        <h1>Get Hired, <br></br>Get Help—All in a Click</h1>
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
              <li id='clean'><a href="#" className="dropdown-item d-flex justify-content-between align-items-center" onClick={() => setSelectedService('Cleaning')}>Cleaning<img src= {cleaning} alt='cleaning supplies'/></a></li>
              <li id='land'><a href="#" className="dropdown-item d-flex justify-content-between align-items-center" onClick={() => setSelectedService('Landscaping')}>Landscaping<img src={landscaping} alt='garden tools'/></a></li>
              <li id='plumb'><a href="#" className="dropdown-item d-flex justify-content-between align-items-center" onClick={() => setSelectedService('Plumbing')}>Plumbing<img src={plumbing} alt='plumbing supplies'/></a></li>
              <li id='ex'><a href="#" className="dropdown-item d-flex justify-content-between align-items-center" onClick={() => setSelectedService('Exterminator')}>Exterminator<img src={exterminator} alt='bug'/></a></li>
              <li id='hand'><a href="#" className="dropdown-item d-flex justify-content-between align-items-center" onClick={() => setSelectedService('Handy Man')}>Handy Man<img src={handyman} alt='drill'/></a></li>
              <li id='move'><a href="#" className="dropdown-item d-flex justify-content-between align-items-center" onClick={() => setSelectedService('Moving')}>Moving<img src={moving} alt='moving truck'/></a></li>
              <li id='elec'><a href="#" className="dropdown-item d-flex justify-content-between align-items-center" onClick={() => setSelectedService('Electrical work')}>Electrical Work<img src={electricalWork} alt='electrical supplies'/></a></li>
              <li id='paint'><a href="#" className="dropdown-item d-flex justify-content-between align-items-center" onClick={() => setSelectedService('painting')}> Painting<img src={painting} alt='paint supplies'/></a></li>
              </ul>
            </div>
          </div>
          <div className='col'>
            <div className='d-flex justify-content-center'>
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
              >{zipcode || 'Where are you?'} </button>
              <ul className='dropdown-menu' aria-labelledby="dropdownMenuButton">
              <li id='brklyn'><a href="#" className="dropdown-item d-flex justify-content-between align-items-center" onClick={() => setZipcode('Brooklyn')}>Brooklyn</a></li>
              <li id='ft'><a href="#" className="dropdown-item d-flex justify-content-between align-items-center" onClick={() => setZipcode('Five Towns')}>Five Towns</a></li>
              <li id='lkwd'><a href="#" className="dropdown-item d-flex justify-content-between align-items-center" onClick={() => setZipcode('Lakewood')}>Lakewood</a></li>
              <li id='mnsy'><a href="#" className="dropdown-item d-flex justify-content-between align-items-center" onClick={() => setZipcode('Monsey')}>Monsey</a></li>
              <li id='qwns'><a href="#" className="dropdown-item d-flex justify-content-between align-items-center" onClick={() => setZipcode('Queens')}>Queens</a></li>
              <li id='si'><a href="#" className="dropdown-item d-flex justify-content-between align-items-center" onClick={() => setZipcode('Staten Island')}>Staten Island</a></li>
              </ul>
              </div>
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
          onClick={handleFindHelper}>
              Find Helper →
            </button>
        </div>
      </div>
    </div>
    <div className='row'>
    {loading ? (
      <h3>Loading providers...</h3>
    ) : error ? (
      <h3>No Providers for this service</h3>
    ): ServiceMatch.length > 0 ? (
    ServiceMatch.map((provider) => (
      <div key={provider.provider_id} className="col-md-4 mb-4">
       <div className="card">
        <img src={provider.profile_image || 'https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHspmtXJeX1ZxE6N01CMjJzUq.jpg'} className="card-img-top"/>
        <div className="card-body">
        <h5 className="card-title">{provider.firstName} {provider.lastName}</h5>
        <p className="card-text">Years of Experience: {provider.experience}</p>
         <button className="btn btn-danger" onClick={() => navigate(`/provider/${provider.provider_id}`)}>View Profile</button>
                        </div>
                      </div>
                      </div>
                    ))
                ) : null}
    <div className='container mt-5'>
      <h2 className='text-center mb-4'>Hear from our happy customers</h2>
      <div className='row'>
        {topReviews.map((review, index) => (
          <div key={index} className='col-md-4 mb-4'>
            <div className='card shadow-sm d-flex flex-column h-100'>
              <div className='card-body'>
                <h5 className='card-title'>{review.name}</h5>
                <p className='card-text'>
                  <StarRating rating={review.rating}/>
                </p>
                <p className='card-text'>{review.comment}</p>
              </div>
            </div>
          </div>
          ))}
          </div>
        </div>
      </div>
    </div>
    );
  }

export default HomePage;