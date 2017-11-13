import axios from 'axios';
import getReview from './reviewActionCreator'


export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';


export const receiveComment = comment => {
	return {
		type: RECEIVE_COMMENT,
		comment
	}
}


export const addComment = (comment, product_id) => dispatch => {
	console.log('tring to add comment');
	axios.post(`/api/comment/`, comment)
	//.then(() => dispatch(getComment(comment.product_review_id)))
	.catch(error => console.error(`Could not add comment, ${comment}`, error))
}

export const getCommentsById = review_id => dispatch => {
		console.log("tring to get comment");
	  axios.get(`/api/comment/review_id=${review_id}`)
	  .then(response => {
	    console.log('RESPONSE', response);
	    //receiveReviews or receiveReview ??
	    dispatch(receiveComment(response.data));
	  })
	  .catch(error => console.error("Could Not Retrieve Comments", error))
	}
