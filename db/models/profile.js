const Sequelize = require('sequelize');
const db = require('APP/db');

const User_Profile = db.define('users', {
  name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isEmail: true,
    }
  },
  session_id: {
    type: Sequelize.STRING
  }, password_digest: Sequelize.STRING, password: Sequelize.VIRTUAL, isAdmin: { type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = User_Profile;
