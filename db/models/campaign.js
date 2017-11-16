const Sequelize = require('sequelize');
const db = require('APP/db');

const Campaign = db.define('campaigns', {
  camptitle: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isLongEnough: function(val) {
        if(val.length < 5) {
          throw new Error('Please input more descriptive title for your campaign.')
        }
      }
    }
  },

  campdetails: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isLongEnough: function(val) {
        if(val.length < 15) {
          throw new Error('Please input more descriptive details for your campaign.')
        }
      }
    }
  },

  campstarttime: {
    type: Sequelize.DATE
    // allowNull: false,
    // defaultValue: Sequelize.NOW
  },

  campendtime: {
    type: Sequelize.DATE
    //allowNull: false
  },

  campzipcode: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  campcreater: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  numinfluencers: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },

  campbudget: {  //total budget for the campaign
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: { notEmpty: true }
  },

   payment_currency: {
     type: Sequelize.STRING,
     defaultValue: 'usd'
   },

  image1: {
    type: Sequelize.STRING
  },

  image2: {
    type: Sequelize.STRING
  },

  image3: {
    type: Sequelize.STRING
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
});

module.exports = Campaign;
