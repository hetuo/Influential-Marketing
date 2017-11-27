import axios from 'axios';

export const RECEIVE_CAMPAIGN = 'RECEIVE_CAMPAIGN';
export const RECEIVE_CAMPAIGNS = 'RECEIVE_CAMPAIGNS';
export const SET_CAMPAIGN = 'SET_CAMPAIGN';
export const RECEIVE_INVITES = 'RECEIVE_INVITES';

export const receiveCampains = campaigns => {
	return {
		type: RECEIVE_CAMPAIGNS,
		campaigns
	}
}

export const setCampaign = campaign => {
	return {
		type: SET_CAMPAIGN,
		campaign
	}
}

export const receiveInvites = invites => {
	return {
		type: RECEIVE_INVITES,
		invites
	}
}

export const updateCampaign = (id, req) => dispatch =>{
	console.log("going to update campaign status");
	axios.put(`/api/hireInfluencer/${id}`, req)
	.catch(error => console.error("Could not update campaign", error))
}

export const getInvites = (id) => dispatch =>{
	console.log("tring to get all the invites");
	axios.get(`/api/hireInfluencer/influencerid/${id}`)
	.then(response =>{
		console.log('RESPONSE', response);
		dispatch(receiveInvites(response.data));
	})
	.catch(error => console.error("Could not retrieve invites", error))
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
	console.log("tring to get campaign by id");
	axios.get(`/api/campaigns/brandid/${brand_id}`)
	.then(response => {
		console.log('campaigns: ', response.data);
		dispatch(receiveCampains(response.data));
	})
	.catch(error => console.error("Could not retrieve campaigns", error))
}

export const inviteInfluencer = (i) => dispatch =>{
	console.log("tring to register influencer");
	axios.post(`/api/hireInfluencer/`, i)
	.catch(error => console.error("Could not invite influencer", error))
}

export const setSelectCampaign = (campaign) => dispatch =>{
	dispatch(setCampaign(campaign));
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
