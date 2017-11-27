'use strict'

const db = require('APP/db');
const api = module.exports = require('express').Router()

api
  .get('/heartbeat', (req, res) => res.send({ok: true,}))
  .use('/auth', require('./routes/auth'))
  .use('/users', require('./routes/users'))
  .use('/brands', require('./routes/brands'))
  .use('/influencers', require('./routes/influencers'))
  .use('/message', require('./routes/message'))
  .use('/profile', require('./routes/profile'))
  .use('/address', require('./routes/address'))
  .use('/cart', require('./routes/cart-line-item'))
  .use('/category', require('./routes/categories'))
  .use('/order', require('./routes/order'))
  .use('/product', require('./routes/product'))
  .use('/review', require('./routes/product-review'))
  .use('/orderProduct', require('./routes/order-product'))
  .use('/comment', require('./routes/comment'))
  .use('/campaigns', require('./routes/campaigns'))
  .use('/hireInfluencer', require('./routes/hire_influencer'))
  .use('https://api.stripe.com', require('./routes/stripe'))

// Send along any errors
api.use((err, req, res, next) => {
  res.status(500).send(err);
});

// No routes matched? 404.
api.use((req, res) => res.status(404).end());
