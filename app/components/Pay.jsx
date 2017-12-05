import React from 'react'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const CURRENCY = 'USD';

const successPayment = data => {
  alert('Payment Successful');
};

const errorPayment = data => {
  alert('Payment Error');
  console.log(data);
};

const onToken = (amount, description, sk) => token =>
  axios.post('/api/stripe/',
    {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: amount,
      sk: sk
    })
    .then(successPayment)
    .catch(errorPayment);

const Checkout = ({ name, description, amount, pk, sk }) =>{
  console.log(name, description, amount, pk, sk);
  return (
    <StripeCheckout
      name={name}
      description={description}
      amount={amount * 100}
      token={onToken(amount, description, sk)}
      currency={CURRENCY}
      stripeKey={pk}
    />
  )
}


export default Checkout;
