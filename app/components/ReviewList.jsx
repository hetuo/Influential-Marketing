import React from 'react';
import SingleReview from './SingleReview';
import {List, ListItem} from 'material-ui/List';

const ReviewList = ({ reviews }) => {
  return (
    <div className='grid grid__gutters grid__1of2 grid__space-around animate-top'>
      <div className='grid-cell animate-top'  style={{maxWidth: '530px', minWidth: '280px'}}>
      <List>
      {
        reviews && reviews.map((review, index) => {
          return (
            <div key={index} className="row review">
              <SingleReview review={ review } index={ index }/>
            </div>
          );
        })
      }
    </List>
    </div>
  </div>
  );
};

export default ReviewList;
