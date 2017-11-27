'use strict'

const bcrypt = require('bcrypt')
const Sequelize = require('sequelize')
const db = require('..')
const _ = require('lodash');

const Influencer = db.define('influencers', {
    name: Sequelize.STRING,
    usertype: Sequelize.STRING,
    email: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      }
    },
    session_id: {
      type: Sequelize.STRING
    },
    gender: {
      type: Sequelize.STRING
    },
    geo: {
      type: Sequelize.STRING
    },
    zipcode: {
      type: Sequelize.STRING
    },
    isValid: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    isDirector: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    Remark1: {
      type: Sequelize.STRING
    },
    Remark2: {
      type: Sequelize.STRING
    },
    Remark3: {
      type: Sequelize.STRING
    },
    password_digest: Sequelize.STRING,
    password: Sequelize.VIRTUAL,
    isAdmin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  }, {
    indexes: [{fields: ['email'], unique: true,}],
    hooks: {
    beforeCreate: setEmailAndPassword,
    beforeUpdate: setEmailAndPassword,
    afterUpdate: (influencer, options)=>{
      return Influencer.removeUserWithSessionId(influencer.session_id)
    },
  },
  classMethods:{
    removeUserWithSessionId(sessionId){
      let member, guest;
      return Influencer.findAll({
          where:{ session_id:sessionId }
        }).then(influencers=>{
          member = _.find(influencers, (influencer)=>(influencer.email !== null))
          guest = _.find(influencers, (influencer)=>(influencer.email === null))
          // console.log('##### MEMBER & GUEST ####',member, guest)
          if(member && guest) {
            // if duplicate session_id exist in database
            // we will reassign associated user id from 'Address' & 'Cart'

            // console.log('Address')
            return Address.reassignUser(guest.id, member.id)
          }
        }).then(()=>{
            // console.log('Cart_Line_Item')
            if(member && guest) {
              return Cart_Line_Item.reassignUser(guest.id, member.id)
            }
        }).then(()=>{
            return Influencer.destroy({
              where:{ session_id:sessionId, $and: {email: {$eq: null}}}
            })
        }).then(affectedRows=>{
          // console.log('affectedRows',affectedRows)
        })
    },
    emptySessionId(influencerId){
      return this.update({
          session_id: null
        },{
          where: { id: influencerId }
        })
    },
  },
  instanceMethods: {
    authenticate(plaintext) {
      return new Promise((resolve, reject) =>
        bcrypt.compare(plaintext, this.password_digest,
          (err, result) =>
            err ? reject(err) : resolve(result))
        )
    }
  }
});

function setEmailAndPassword(influencer) {
  influencer.email = influencer.email && influencer.email.toLowerCase()
  if (!influencer.password) return Promise.resolve(influencer)

  return new Promise((resolve, reject) =>
    bcrypt.hash(influencer.get('password'), 10, (err, hash) => {
      if (err) reject(err)
      // user.set('password_digest', hash)
      influencer.set('password_digest', influencer.password)
      resolve(influencer)
    })
  )
}

module.exports = Influencer
