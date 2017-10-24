const db = require('APP/db');
const express = require('express');
const router = module.exports = express.Router()
const productReview = require('APP/db/models/product_review');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


router.get('/', (req, res, next) =>
  productReview.findAll()
  .then(productReviews => res.status(200).json(productReviews))
  .catch(next))

router.get('/id=:id', (req, res, next) =>
  productReview.findById(req.params.id)
  .then(productReview => res.json(productReview))
  .catch(next))

router.get('/product_id=:product_id', function (req, res, next) {
      var product_id = req.params.product_id;

      productReview.findAll({ where: {product_id: product_id} })
      .then(productReview => res.status(200).json(productReview))
      .catch(next)
});

router.get('/title=:title&body=:body', function (req, res, next) {
    var title = req.params.title;
    var body = req.params.body;

    productReview.findAll({
      where:
        Sequelize.or (
          {title: {$ilike: '%' + title + '%'}},
          {body: {$ilike: '%' + body + '%'}}
        )
      })
    .then(productReview => res.status(200).json(productReview))
    .catch(next)
});

router.post('/', (req, res, next) =>
  productReview.create(req.body)
  .then(productReview => res.status(201).json(productReview))
  .catch(next))

router.put('/:id', (req, res, next) =>
  productReview.update(req.body,
    {
      where: {
        id: req.params.id
      }
    })
    .then((count, updated) =>
    res.status(201).json(updated[0])
  )
  .catch(next))

router.delete('/:id', (req, res, next) =>
  productReview.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(deleted => res.sendStatus(204).end())
  .catch(next));

module.exports = router;
