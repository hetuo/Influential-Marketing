const express = require('express');
const router = module.exports = express.Router();

var stripe = require('stripe')("sk_test_BQokikJOvBiI2HlWgH4olfQ2");


router.post('/', function(req, response, next){
  console.log(req.body);
  var stripeToken = req.body.id;

  var charge = stripe.charges.create({
      amount: req.body.payment_amount,
      currency: req.body.paymentcurrency,
      source: stripeToken,
      //description: "hire influencer charge"
      description: req.body.statement_descriptor
    }, function(err, charge) {
    if (err && err.type === 'StripeCardError') {
      // The card has been declined
      console.log(err);
    }
  });
});
