import React, { useState, useEffect } from "react";
import StarRating from './StarRating';



const Reviews = () => {

  const [reviews, setReviews]= useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    (async() => {
      try{
        const reviewResponse = await fetch('http://localhost:5000/reviews');
        if (!reviewResponse.ok) throw new Error('Network response was not ok');
        const reviewData = await reviewResponse.json();
        setReviews(reviewData);
        
        const customerResponse = await fetch ('http://localhost:5000/customers');
        if(!customerResponse.ok) throw new Error('Network response was not ok');
        const customerData = await customerResponse.json();
        setCustomers(customerData);

      }catch(err){
        setError(err.message);
      } finally{
        setLoading(false);
      }
    })();
  },[])

  const reviewsWithCustomerNames = reviews.map(review =>{
    const customer = customers.find(c => c.customer_id === review.customer_id);
    return {
      ...review,
      name: customer ?  customer.name : 'Anonymous Review'
    };
  })
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return(
    <div className='container mt-5'>
      <h1 className='display-3 caveat-font text-center'>Hear from our customers</h1>
      <div className='row'>
        {reviewsWithCustomerNames.map((review, index) => (
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