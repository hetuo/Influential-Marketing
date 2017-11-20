import axios from 'axios';

export const CREATE_CAMPAIGN = 'CREATE_CAMPAIGN';

export const create = campaign => {
	return {
		type: CREATE_CAMPAIGN,
		campaign
	}
}

export const createCampaign = (campaign) => dispatch =>{
	console.log("tring to add campaign");
	axios.post(`/api/campaigns/`, campaign)
	.then(response => {
		console.log('RESPONSE', response);
		//receiveReviews or receiveReview ??
		//dispatch(receiveInfluencers(response.data));
	})
	.catch(error => console.error("Could Not Retrieve influencers", error))}

export const getCampaignsByUserId = (brand_id) => dispatch =>{
	console.log("tring to add campaign");
}

export const addCampaign = (campaign) => dispatch =>{
	console.log("tring to add campaign");
	axios.post(`/api/campaign/`, campaign)
	.then(response => {
		console.log('RESPONSE', response);
		//receiveReviews or receiveReview ??
		//dispatch(receiveInfluencers(response.data));
	})
	.catch(error => console.error("Could Not Retrieve influencers", error))}
