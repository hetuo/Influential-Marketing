const Sequelize = require('sequelize');
const db = require('APP/db');

const HireInfluencer = db.define('hire_influencer', {
	hirestage:{
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: '0',
		validate: {
			notEmpty: true
		}
  },
	payment_amount: {   //amount paid to the individual influencer
		type: Sequelize.FLOAT,
		defaultValue: 0
	},
	paymentcurrency: {
		type: Sequelize.STRING,
		defaultValue: 'usd'
	}
});

module.exports = HireInfluencer;
