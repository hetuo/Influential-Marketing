const db = require('APP/db');
const express = require('express');
const router = module.exports = express.Router()
const Brand = require('APP/db/models/brand');
const Campaign = require('APP/db/models/campaign');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;



router.get('/', (req, res, next) =>
  Campaign.findAll()
  .then(campaigns => res.json(campaigns))
  .catch(next))


// router.get('/', (req, res, next) =>
//     Campaign.findAll({ include: [ Brand ] })
//     .then(campaigns => {
//       console.log(JSON.stringify(campaigns))})
//     .then(campaigns => res.status(200).json(campaigns))
//     .catch(next))



router.get('/:campaignId', function (req, res, next) {
  console.log("campaignId's req.body", req.body);
  Campaign.findOne({
   where: {id: req.params.campaignId},
   include: [
     { model: Brand}]
   })
  .then(campaign => {
   res.json(campaign)
  })
  .catch(next)
});


router.get('/creater/:creater', function (req, res, next) {
  console.log("creater's campaign req.body", req.body);
        var creater = req.params.creater;
        Campaign.findAll({
          include: [{
            model: Brand,
            as: 'Brand',
            where: {name: creater}
          }]
        })
        //.then(campaigns => {console.log(JSON.stringify(campaigns))})
        //.catch(console.error)
        .then(campaigns => res.json(campaigns))
        .catch(next)
  });

// router.get('/title=:title&body=:body', function (req, res, next) {
//     var title = req.params.title;
//     var body = req.params.body;
//
//     Campaign.findAll({
//       where:
//         Sequelize.or (
//           {title: {$ilike: '%' + title + '%'}},
//           {body: {$ilike: '%' + body + '%'}}
//         )
//       })
//     .then(Campaign => res.status(200).json(Campaign))
//     .catch(next)
// });

router.post('/', (req, res, next) => {
  console.log("campaign: req.body", req.body)
  Campaign.create(req.body)
  .then(newCampaign => res.status(201).json(newCampaign))
  .catch(next)
});

router.put('/:campaignId', (req, res, next) => {
  console.log("put campaignId req.body",req.body)
  Campaign.findById(req.params.campaignId)
  .then(targetCampaign => targetCampaign.update(req.body))
  .then(updatedCampaign => res.status(202).send(updatedPCampaign))
  .catch(next)
});

router.delete('/:campaignId', (req, res, next) => {
  console.log("delete campaignId req.body",req.body)
  Campaign.destroy({
    where: {
      id: req.params.campaignId
    }
  })
  .then(deleted => res.sendStatus(204).end())
  .catch(next)
});

module.exports = router;
