import React from 'react';

const StarRating = ({rating}) => {
  const maxRating = 5;
  const stars = [];

  for (let i = 1; i<= maxRating; i++){
    stars.push(
      <i 
        key={i}
        className={`bi bi-star${i <= rating ? '-fill' : ''}`}
        style={{ color: i <= rating ? 'gold' : 'lightgray' }}
        ></i>
    );
  }

  return <div className='star-rating'>{stars}</div>;
};

export default StarRating;