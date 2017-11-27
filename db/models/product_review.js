const Sequelize = require('sequelize');
const db = require('..');

const Product_Review = db.define('product_review', {
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

  stars: {
    type: Sequelize.ENUM('0','1','2','3','4','5'),
    allowNull: true,
    defaultValue: '0'
  },

  keyword1: {
    type: Sequelize.STRING
  },

  keyword2: {
    type: Sequelize.STRING
  },

  keyword3: {
    type: Sequelize.STRING
  },

  category: {
    type: Sequelize.STRING
  },

  venue_type: {
    type: Sequelize.STRING
  },

  customer_group: {
    type: Sequelize.STRING
  },

  cuisine_type: {
    type: Sequelize.STRING
  },

  price: {
    type: Sequelize.STRING
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

module.exports = Product_Review;
