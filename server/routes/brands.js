'use strict'

const db = require('APP/db')
const Brand = db.model('brands')

const {mustBeLoggedIn, forbidden,} = require('./auth.filters')

module.exports = require('express').Router()
	.get('/', forbidden('only admins can list brands'), (req, res, next) =>
		Brand.findAll()
		.then(brands => res.json(brands))
		.catch(next))

	.post('/', (req, res, next) =>
		Brand.create(req.body)
		.then(brand => res.status(201).json(brand))
		.catch(next))

	.get('/:id', mustBeLoggedIn, (req, res, next) =>
		Brand.findById(req.params.id)
		.then(brand => res.json(brand))
		.catch(next))

  .put('/:id', (req, res, next) => {
		// console.log('req.params.id: ' + req.params.id);
		Brand.findById(req.params.id)
		.then(brand => {
			 brand.email = req.body.email;
			 brand.name = req.body.name;
			 brand.zipcode = req.body.zipcode;
			 brand.save()
				 .then(brand => {res.json(brand);})
		})
  })
