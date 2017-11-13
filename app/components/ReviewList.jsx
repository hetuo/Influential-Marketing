import React from 'react';
import SingleReview from './SingleReview';


const ReviewList = ({ reviews }) => {
  return (
    <div className="container-fluid" style={{padding: '0 20px'}}>
    {
      reviews && reviews.map((review, index) => {
        return (
          <div key={index} className="row review">
            <SingleReview review={ review } index={ index }/>
          </div>
        );
      })
    }
  </div>
  );
};

export default ReviewList;
