import { CREATE_CAMPAIGN, createCampaign } from '../action-creators/CampaignActionCreator';

const campaignInitialState = {
	campaign: ''
}

export default (state = campaignInitialState, action) => {
	const newState = Object.assign({}, state);

	switch(action.type) {
		case CREATE_CAMPAIGN:
			newState.campaign = action.campaign;
    //  newState.
			break;
		//case RECEIVE_REVIEWS:
		//	newState.list = action.reviews;
		//	break;


		default:
			return state;
	}

	return newState;
}
