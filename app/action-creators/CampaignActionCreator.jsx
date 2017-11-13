import axios from 'axios';

export const CREATE_CAMPAIGN = 'CREATE_CAMPAIGN';

export const createCampaign = campaign => {
	return {
		type: CREATE_CAMPAIGN,
		campaign
	}
}

export const addCampaign = (campaign) => dispatch =>{
		console.log("tring to get review");
    dispatch(createCampaign(campaign))
  }
