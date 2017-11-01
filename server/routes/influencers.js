'use strict'

const db = require('APP/db')
const Influencer = db.model('influencers')

const {mustBeLoggedIn, forbidden,} = require('./auth.filters')

module.exports = require('express').Router()
	.get('/', forbidden('only admins can list influencers'), (req, res, next) =>
		Influencer.findAll()
		.then(influencers => res.json(users))
		.catch(next))

	.post('/', (req, res, next) =>
		Influencer.create(req.body)
		.then(influencer => res.status(201).json(user))
		.catch(next))

	.get('/:id', mustBeLoggedIn, (req, res, next) =>
		Influencer.findById(req.params.id)
		.then(influencer => res.json(user))
		.catch(next))

  .put('/:id', (req, res, next) => {
		//console.log('req.params.id: ' + req.params.id);
		Influencer.findById(req.params.id)
		.then(influencer => {
			 influencer.email = req.body.email;
			 influencer.name = req.body.name;
			 influencer.save()
				 .then(influencer => {res.json(user);})
		})
  })
