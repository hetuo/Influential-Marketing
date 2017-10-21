'use strict'

const db = require('APP/db')
const User = db.model('users')

const {mustBeLoggedIn, forbidden,} = require('./auth.filters')

module.exports = require('express').Router()
	.get('/', forbidden('only admins can list users'), (req, res, next) =>
		User.findAll()
		.then(users => res.json(users))
		.catch(next))
	.post('/', (req, res, next) =>
		User.create(req.body)
		.then(user => res.status(201).json(user))
		.catch(next))
	.get('/:id', (req, res, next) =>
		User.findById(req.params.id)
		.then(user => res.json(user))
		.catch(next))
	// mustBeLoggedIn
  .put('/:id', (req, res, next) => {
	  //console.log('req.headers.email: ' + req.headers.email);
		console.log('req.params.id: ' + req.params.id);
		User.update(
			{	email: 'alexguo.ca@gmail.com'	}
    ).then(() => {})
  })
