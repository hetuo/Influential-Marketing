import axios from 'axios';

export const RECEIVE_INFLUENCERS = 'RECEIVE_INFLUENCERS';
export const RECEIVE_INFLUENCER = 'RECEIVE_INFLUENCER';

export const receiveInfluencers = influencers => {
	return {
		type: RECEIVE_INFLUENCERS,
		influencers
	}
}

export const receiveInfluencer = influencer => {
	return {
		type: RECEIVE_INFLUENCER,
		influencer
	}
}


export const getInfluencers = () => dispatch =>{
		console.log("tring to get review");
	  axios.get(`/api/influencers/`)
	  .then(response => {
	    console.log('RESPONSE', response);
	    //receiveReviews or receiveReview ??
	    dispatch(receiveInfluencers(response.data));
	  })
	  .catch(error => console.error("Could Not Retrieve influencers", error))}

export const getSingleInfluencer = (id) => dispatch =>{
		console.log("tring to get review");
	  axios.get(`/api/influencers/${id}`)
	  .then(response => {
	    console.log('RESPONSE', response);
	    //receiveReviews or receiveReview ??
	    dispatch(receiveInfluencer(response.data));
	  })
	  .catch(error => console.error("Could Not Retrieve influencers", error))}
