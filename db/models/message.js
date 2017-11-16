const Sequelize = require('sequelize');
const db = require('APP/db');

const Message = db.define('message', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isLongEnough: function(val) {
        if(val.length < 5) {
          throw new Error('Please input more descriptive content for the title.')
        }
      }
    }
  },

  content: {
    type: Sequelize.STRING
  },

  from_id: {
    type: Sequelize.INTEGER
  },

  from_type: {
    type: Sequelize.STRING
  },

  to_id: {
    type: Sequelize.INTEGER
  },

  to_type: {
    type: Sequelize.STRING
  },

  has_Read: {
    type: Sequelize.STRING
  },

  isValid: {
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

module.exports = Message;
