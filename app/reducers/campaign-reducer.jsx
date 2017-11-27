import { RECEIVE_CAMPAIGNS, SET_CAMPAIGN, RECEIVE_INVITES } from '../action-creators/CampaignActionCreator';

const campaignInitialState = {
	campaigns: [],
	invites: [],
	selectedCampaign: {}
}

export default (state = campaignInitialState, action) => {
	const newState = Object.assign({}, state);

	switch(action.type) {
		case RECEIVE_CAMPAIGNS:
			newState.campaigns = action.campaigns;
    //  newState.
			break;
		case SET_CAMPAIGN:
			newState.selectedCampaign = action.campaign;
			break;
		case RECEIVE_INVITES:
			newState.invites = action.invites;
			break;

		default:
			return state;
	}

	return newState;
}
