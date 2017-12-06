import React from 'react'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import { updateCampaign } from '../action-creators/CampaignActionCreator';
import store from '../store';
const CURRENCY = 'USD';

const update = (id, req) =>{
	console.log("going to update campaign status");
	axios.put(`/api/hireInfluencer/${id}`, req)
	.catch(error => console.error("Could not update campaign", error))
}

const successPayment = data => {
  console.log('the data is ....', data);
  const req = {
    hirestage: 2
  }
  store.dispatch(updateCampaign(data, req));
  console.log('after updated ....', data);
  alert('Payment Successful');
  window.location.reload();
};

const errorPayment = data => {
  alert('Payment Error');
  console.log(data);
};


const onToken = (amount, description, sk, id) => token =>{
  console.log('lallalallallalallaall');
  axios.post('/api/stripe/',
    {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: amount,
      sk: sk
    })
    .then(successPayment(id))
    .catch(errorPayment);
}

const Checkout = ({ name, description, amount, pk, sk, id}) =>{
  console.log(name, description, amount, pk, sk);
  return (
    <StripeCheckout
      name={name}
      description={description}
      amount={amount * 100}
      token={onToken(amount, description, sk, id)}
      currency={CURRENCY}
      stripeKey={pk}
    />
  )
}


export default Checkout;
