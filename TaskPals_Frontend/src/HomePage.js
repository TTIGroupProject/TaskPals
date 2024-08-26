import React, { useState } from 'react';
import './HomePage.css'
import cleaning from './images/cleaning.jpg'
import landscaping from './images/gardener.jpg'
import plumbing from './images/plumbing.png'
import exterminator from './images/exterminator.jpg'
import handyman from './images/drill.jpg'
import moving from './images/moving.jpg'
import electricalWork from './images/electrician.jpg'
import painting from './images/paint.jpg'
import StarRating from './StarRating';


const reviews = [
  {name: "Alice Johnson", rating: 5, comment: "Excellent service! The handyman was on time and very professional.",},
  {name: "Bob Smith", rating: 4, comment: "Great experience, but the plumber was a bit late.",},
  {name: "Charlie Brown", rating: 5,comment: "The cleaning service exceeded my expectations. Highly recommend!",},
  {name: "Daisy Williams", rating: 3, comment: "Service was good, but the gardener missed a few spots in the yard.",},
  {name: "Edward Davis", rating: 5,comment: "The moving team was fantastic. They handled everything with care and efficiency.",},
  {name: "Fiona Martin",rating: 4, comment: "The electrician did a great job fixing the issues, though the appointment took a bit longer than expected.",},
  {name: "George Clark",rating: 2,comment: "Not satisfied with the extermination service. The issue was not resolved effectively.",},
  {name: "Hannah Lewis",rating: 5,comment: "Very impressed with the painting work. The walls look fresh and vibrant!",},
  {name: "Ian Walker",rating: 4,comment: "The handyman was skilled and helpful, but the service was a bit pricey.",},
  {name: "Julia Young",rating: 5,comment: "Fantastic landscaping service. The garden looks beautiful and well-maintained.",},
  {name: "Kyle Thompson",rating: 3,comment: "The plumber fixed the leak but left some mess behind. Overall, an okay experience.",},
  {name: "Laura Martinez",rating: 5,comment: "Top-notch cleaning service. My house has never been so spotless!",},
  {name: "Mike Harris",rating: 4,comment: "Good service overall, but I had to wait a bit longer than promised.",},
  {name: "Nina Adams",rating: 5,comment: "Wonderful moving service. The team was efficient and friendly, and everything arrived in perfect condition.",},
  {name: "Oliver Scott",rating: 4,comment: "The exterminator was effective, but the scheduling process was a bit cumbersome.",},
  {name: "Penny Robinson",rating: 3,comment: "The painting service was okay, but there were a few touch-ups needed.",},
];


const HomePage = () => {
  const [selectedService, setSelectedService] = useState('');
  const [zipcode, setZipcode] = useState('');

  const sortedReviews = reviews.sort((a, b) => b.rating - a.rating);
  const topReviews = sortedReviews.slice(0, 6);

  const isButtonEnabled = selectedService && zipcode

  return(

    <div className='page-wrapper app-container'>
    <div className='container-fluid p-4'>
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
              <li><a href="#" className="dropdown-item d-flex justify-content-between align-items-center" onClick={() => setSelectedService('Cleaning', <img src= {cleaning} alt='cleaning supplies'/>)}>Cleaning<img src= {cleaning} alt='cleaning supplies'/></a></li>
              <li><a href="#" className="dropdown-item d-flex justify-content-between align-items-center" onClick={() => setSelectedService('Landscaping',)}>Landscaping<img src={landscaping} alt='garden tools'/></a></li>
              <li><a href="#" className="dropdown-item d-flex justify-content-between align-items-center" onClick={() => setSelectedService('Plumbing',)}>Plumbing<img src={plumbing} alt='plumbing supplies'/></a></li>
              <li><a href="#" className="dropdown-item d-flex justify-content-between align-items-center" onClick={() => setSelectedService('Exterminator')}>Exterminator<img src={exterminator} alt='bug'/></a></li>
              <li><a href="#" className="dropdown-item d-flex justify-content-between align-items-center" onClick={() => setSelectedService('Handy Man',)}>Handy Man<img src={handyman} alt='drill'/></a></li>
              <li><a href="#" className="dropdown-item d-flex justify-content-between align-items-center" onClick={() => setSelectedService('Moving',)}>Moving<img src={moving} alt='moving truck'/></a></li>
              <li><a href="#" className="dropdown-item d-flex justify-content-between align-items-center" onClick={() => setSelectedService('Electrical work',)}>Electrical Work<img src={electricalWork} alt='electrical supplies'/></a></li>
              <li><a href="#" className="dropdown-item d-flex justify-content-between align-items-center" onClick={() => setSelectedService('painting',)}> Painting<img src={painting} alt='paint supplies'/></a></li>
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
          onClick={()=>{
            if (isButtonEnabled) {
              alert(`Finding helpers for ${selectedService} in zipcode ${zipcode}`)
            }
          }}
            >
              Find Helper →
            </button>
        </div>
      </div>
    </div>
    <div className='container mt-5'>
      <h2 className='text-center mb-4'>What our customers are saying</h2>
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
  );
}

export default HomePage