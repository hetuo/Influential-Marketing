const db = require('APP/db');
const express = require('express');
const router = module.exports = express.Router()
const message = require('APP/db/models/message');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', (req, res, next) =>
  message.findAll()
  .then(message => res.status(200).json(message))
  .catch(next))

router.get('/to_id=:to_id', function (req, res, next) {
      var to_id = req.params.to_id;

      message.findAll({ where: {to_id: to_id} })
      .then(message => res.status(200).json(message))
      .catch(next)
});

router.post('/', (req, res, next) =>
  message.create(req.body)
  .then(message => res.status(201).json(message))
  .catch(next))

module.exports = router;
