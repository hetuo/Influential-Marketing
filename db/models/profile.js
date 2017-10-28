const Sequelize = require('sequelize');
const db = require('APP/db');

const User_Profile = db.define('profile', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isLongEnough: function(val) {
        if(val.length < 5) {
          throw new Error('Please input more descriptive review for the product.')
        }
      }
    }
  },

  body: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isLongEnough: function(val) {
        if(val.length < 15) {
          throw new Error('Please input more descriptive review for the product.')
        }
      }
    }
  },

});

module.exports = User_Profile;
