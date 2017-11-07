const db = require('APP/db');
const express = require('express');
const router = module.exports = express.Router()
const productReview = require('APP/db/models/product_review');
const comment = require('APP/db/models/comment');
const user = require('APP/db/models/user');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/*
router.get('/', (req, res, next) =>
  productReview.findAll({include: [user]})
  .then(productReviews => res.status(200).json(productReviews))
  .catch(next))

router.get('/id=:id', (req, res, next) =>
  productReview.findById(req.params.id, {include: [user]})
  .then(productReview => res.json(productReview))
  .catch(next))*/

router.get('/review_id=:review_id', function (req, res, next) {
      var review_id = req.params.review_id;

      comment.findAll({ where: {product_review_id: review_id}, include: [user] })
      .then(comment => res.status(200).json(comment))
      .catch(next)
});

/*router.get('/title=:title&body=:body', function (req, res, next) {
    var title = req.params.title;
    var body = req.params.body;

    productReview.findAll({
      where:
        Sequelize.or (
          {title: {$ilike: '%' + title + '%'}},
          {body: {$ilike: '%' + body + '%'}}
        ), include: [user]
      })
    .then(productReview => res.status(200).json(productReview))
    .catch(next)
});*/

router.post('/', (req, res, next) =>
  comment.create(req.body)
  .then(comment => res.status(201).json(comment))
  .catch(next))

/*router.put('/:id', (req, res, next) =>
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
  .catch(next));*/

module.exports = router;
