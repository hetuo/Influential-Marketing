const express = require('express');
const router = module.exports = express.Router();

const postStripeCharge = res => (stripeErr, stripeRes) => {
 if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
}

router.post('/', function(req, response, next){
  console.log(req.body);
  var stripeToken = req.body.id;
  var stripe = require('stripe')(req.body.sk);
  var charge = stripe.charges.create({
      amount: req.body.amount * 100,
      currency: req.body.currency,
      source: req.body.source,
      //description: "hire influencer charge"
      description: req.body.description
    }, postStripeCharge(response));
});
