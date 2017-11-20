import { SAVE_IMAGE, save } from '../action-creators/ImageUploadActionCreator';

const imageInitialState = {
	image: ''
}

export default (state = imageInitialState, action) => {
	const newState = Object.assign({}, state);

	switch(action.type) {
		case SAVE_IMAGE:
			newState.image = action.image1;
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
