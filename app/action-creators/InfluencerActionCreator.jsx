import axios from 'axios';

export const RECEIVE_INFLUENCERS = 'RECEIVE_INFLUENCERS';

export const receiveInfluencers = influencers => {
	return {
		type: RECEIVE_INFLUENCERS,
		influencers
	}
}

export const getInfluencers = () => dispatch =>{
		console.log("tring to get review");
	  axios.get(`/api/influencer/`)
	  .then(response => {
	    console.log('RESPONSE', response);
	    //receiveReviews or receiveReview ??
	    dispatch(receiveInfluencers(response.data));
	  })
	  .catch(error => console.error("Could Not Retrieve influencers", error))}
