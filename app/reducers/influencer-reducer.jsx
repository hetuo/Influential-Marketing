import { RECEIVE_INFLUENCERS, receiveInfluencers } from '../action-creators/InfluencerActionCreator';

const influencersInitialState = {
	selectedComment: '',
  	list: []
}

export default (state = influencersInitialState, action) => {
	const newState = Object.assign({}, state);

	switch(action.type) {
		case RECEIVE_INFLUENCERS:
			newState.list = action.influencers;
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
