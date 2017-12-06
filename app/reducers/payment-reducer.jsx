import { CREATE_PAYMENT } from '../action-creators/PaymentActionCreator';

const campaignInitialState = {
	payment: {}
}

export default (state = campaignInitialState, action) => {
	const newState = Object.assign({}, state);

	switch(action.type) {
		case CREATE_PAYMENT:
			newState.payment = action.payment;
    //  newState.
			break;

		default:
			return state;
	}

	return newState;
}
