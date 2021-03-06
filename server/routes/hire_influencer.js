const db = require('APP/db');
const express = require('express');
const router = module.exports = express.Router();
const HireInfluencer = require('APP/db/models/hire_influencer');
const Campaign = require('APP/db/models/campaign');
const Brand = require('APP/db/models/brand');

module.exports = express.Router()

  .get('/', (req, res, next) => {
    HireInfluencer.findAll()
    .then(hireInfluencers => res.json(hireInfluencers))
    .catch(next)
  })

  .get('/:id', (req, res, next) => {
    HireInfluencer.findById(req.params.id)
    .then(hireInfluencer => res.json(hireInfluencer))
    .catch(next)
  })

  .get('/campaignid/:campaign_id', (req, res, next) => {
    HireInfluencer.findAll({
      where: {
        campaign_id: req.params.campaign_id
      }
    })
    .then(hireInfluencer => res.json(hireInfluencer))
    .catch(next)
  })


  .get('/brandid/:brand_id', (req, res, next) => {
    HireInfluencer.findAll({
      where: { brand_id: req.params.brand_id },
      include: [Campaign]
    })
    .then(hireInfluencer => res.json(hireInfluencer))
    .catch(next)
  })

  .get('/influencerid/:influencer_id', (req, res, next) => {
    HireInfluencer.findAll({
      where: { influencer_id: req.params.influencer_id, hirestage: 0 },
      include: [ {
        model: Campaign,
        attributes: {
          include: ['camptitle', 'campdetails', 'campzipcode', 'campstarttime', 'campendtime', 'campcreater'],
          exclude: ['campbudget', 'numinfluencers', 'payment_currency']}
        }]
    })
    .then(hireInfluencer => res.json(hireInfluencer))
    .catch(next)
  })

  //.get('/revenue/:brand_id', forbidden('only admins can list revenues'), (req, res, next) => {
  .get('/revenue/:brand_id', (req, res, next) => {
    HireInfluencer.sum(
      'payment_amount', {
      where: { brand_id: req.params.brand_id, hirestage: 2  }
    })
    .then(sum => res.json(sum))
    .catch(next)
  })


//.get('/revenue/category/:category', forbidden('only admins can list revenues'), (req, res, next) => {
  .get('/revenue/category/:category', (req, res, next) => {
    HireInfluencer.sum(
      'payment_amount', {
      where: { hirestage: 2  },
      include: [ {
        model: Brand,
        attributes: [],
        where: { category: req.params.category }
      }]
    })
    .then(sum => res.json(sum))
    .catch(next)
  })

  //.get('/revenue/geo/:geo', forbidden('only admins can list revenues'), (req, res, next) => {
    .get('/revenue/geo/:geo', (req, res, next) => {
      HireInfluencer.sum(
        'payment_amount', {
        where: { hirestage: 2  },
        include: [ {
          model: Brand,
          attributes: [],
          where: { geo: req.params.geo }
        }]
      })
      .then(sum => res.json(sum))
      .catch(next)
    })



  .post('/', (req, res, next)=>{
    console.log("hire_influencer's req.body", req.body)

    HireInfluencer.create(req.body)
    .then(createdHireInfluencer => {
      res.status(201).json(createdHireInfluencer)
    })
    .catch(next)
  })

  // .post('/', (req, res, next)=>{
  //   console.log("hire_influencer's req.body", req.body)
  //
  //   for (var influener_id in req.params.influencerids){
  //
  //   HireInfluencer.create{
  //     brand_id: brand_id
  //     campaign_id: campaign_id
  //     influener_id: influener_id
  //     hirestage: hirestage
  //     payment_amount: payment_amount
  //     payment_currency: payment_currency
  //   }
  //   .then(createdHireInfluencer => {
  //     res.status(201).json(createdHireInfluencer)
  //   })}
  //   .catch(next)
  // })

  .put('/:id', (req, res, next)=>{
    console.log("put hireInfluencerId req.body",req.body)
    HireInfluencer.findById(req.params.id)
    .then(hireInfluencer => hireInfluencer.update(req.body))
    .then(updatedHireInfluencer => {
      res.status(202).send(updatedHireInfluencer)
    })
    .catch(next)
  })

  .delete('/:id', (req, res, next)=>{
    HireInfluencer.findById(req.params.id)
    .then(hireInfluencer => hireInfluencer.destroy())
    .then( () => res.status(204).end())
    .catch(next)
  })
