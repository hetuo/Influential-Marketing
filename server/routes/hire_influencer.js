const db = require('APP/db');
const express = require('express');
const router = module.exports = express.Router();
const HireInfluencer = require('APP/db/models/hire_influencer');
const Campaign = require('APP/db/models/campaign');


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
      where: { influencer_id: req.params.influencer_id },
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

  .post('/', (req, res, next)=>{
    HireInfluencer.create(req.body)
    .then(createdHireInfluencer => {
      res.status(201).json(createdHireInfluencer)
    })
    .catch(next)
  })

  .put('/:id', (req, res, next)=>{
    HireInfluencer.findById(req.params.id)
    .then(hireInfluencer => HireInfluencer.update(req.body))
    .then(updatedHireInfluencer => {
      res.status(202).send(updatedHireInfluencer)
    })
    .catch(next)
  })

  .delete('/:id', (req, res, next)=>{
    HireInfluencer.findById(req.params.id)
    .then(hireInfluencer => HireInfluencer.destroy())
    .then( () => res.status(204).end())
    .catch(next)
  })
