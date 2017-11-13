import { RECEIVE_COMMENT, receiveComment } from 'APP/app/action-creators/CommentActionCreator';

const commentsInitialState = {
	selectedComment: '',
  	list: []
}

export default (state = commentsInitialState, action) => {
	const newState = Object.assign({}, state);

	switch(action.type) {
		case RECEIVE_COMMENT:
			newState.selectedReview = action.comment;
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
