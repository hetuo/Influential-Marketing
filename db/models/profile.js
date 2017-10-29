const Sequelize = require('sequelize');
const db = require('APP/db');

const User_Profile = db.define('users', {
  email: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isEmail: true,
    }
  },
  password: Sequelize.VIRTUAL,
});

module.exports = User_Profile;
