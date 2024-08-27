import React from "react";
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

const Reviews = () => {
  return(
    <div className='container mt-5'>
      <h1 className='text-center mb-4 nerko-font display-1'>Hear from our customers</h1>
      <div className='row'>
        {reviews.map((review, index) => (
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
        </div>)}

export default Reviews