export const CREATE_PAYMENT = 'CREATE_PAYMENT';


export const create = payment => {
	return {
		type: CREATE_PAYMENT,
		payment
	}
}

export const createPayment = (payment) => dispatch =>{
		console.log("tring to create payment");
    dispatch(create(payment));
}
