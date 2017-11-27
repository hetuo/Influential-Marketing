import { RECEIVE_INFLUENCERS, receiveInfluencers, RECEIVE_INFLUENCER, receiveInfluencer } from '../action-creators/InfluencerActionCreator';

const influencersInitialState = {
	selectedInfluencer: {},
  list: []
}

export default (state = influencersInitialState, action) => {
	const newState = Object.assign({}, state);

	switch(action.type) {
		case RECEIVE_INFLUENCERS:
			newState.list = action.influencers;
			break;
		case RECEIVE_INFLUENCER:
			newState.selectedInfluencer = action.influencer;
			break;


		default:
			return state;
	}

	return newState;
}
