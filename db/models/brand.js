'use strict'

const Sequelize = require('sequelize');
const db = require('..');
const bcrypt = require('bcrypt')
const _ = require('lodash');

const Brand = db.define('brands', {
  name: {
    type: Sequelize.STRING
    // allowNull: false,
    // validate: { notEmpty: true }
  },
  usertype: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isEmail: true,
    }
  },

  geo: {
    type: Sequelize.STRING
  },

  zipcode: {
    type: Sequelize.STRING
    // allowNull: false,
    // validate: { notEmpty: true }
  },

  // companytype: {
  //   type: Sequelize.ENUM('food', 'beverage', 'alcohole' )
  //   //allowNull: false,
  //   defaultValue: 'food',
  //   // validate: {
  //   //   notEmpty: true
  //   // }
  // },

  hqaddress: Sequelize.STRING,
  category: Sequelize.STRING,
  weburl: Sequelize.STRING,
  phone: Sequelize.STRING,

  isValid: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },

  image: {
    type: Sequelize.STRING,
    defaultValue: 'APP/public/default-brand-photo.png'
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

  session_id: {
    type: Sequelize.STRING
  },

  password_digest: Sequelize.STRING,
  password: Sequelize.VIRTUAL,  //
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
}, {
  indexes: [{fields: ['email'], unique: true,}],
  hooks: {
    beforeCreate: setEmailAndPassword,
    beforeUpdate: setEmailAndPassword,
    afterUpdate: (brand, options)=>{
    return Brand.removeUserWithSessionId(brand.session_id)
    },
  },
  classMethods:{
  removeUserWithSessionId(sessionId){
    let member, guest;
    return Brand.findAll({
        where:{ session_id:sessionId }
      }).then(brands=>{
        member = _.find(brands, (brand)=>(brand.email !== null))
        guest = _.find(brands, (brand)=>(brand.email === null))
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
          return Brand.destroy({
            where:{ session_id:sessionId, $and: {email: {$eq: null}}}
          })
      }).then(affectedRows=>{
        // console.log('affectedRows',affectedRows)
      })
  },
  emptySessionId(brandId){
    return this.update({
        session_id: null
      },{
        where: { id: brandId }
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
})

  function setEmailAndPassword(brand) {
    brand.email = brand.email && brand.email.toLowerCase()
    if (!brand.password) return Promise.resolve(brand)

    return new Promise((resolve, reject) =>
      bcrypt.hash(brand.get('password'), 10, (err, hash) => {
        if (err) reject(err)
        // user.set('password_digest', hash)
        brand.set('password_digest', brand.password)
        resolve(brand)
      })
    )
  }

module.exports = Brand;
