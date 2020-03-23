'use strict';

const {generatePassword} = require('../helpers/bcryptjs.js')

module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model
  class User extends Model {}

  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please insert an username!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please insert a password!'
        }
      }
    },
  }, {
    hooks: {
      beforeCreate: (instance) => {
        console.log('Enter hook')
        const passInput = instance.password
        console.log('Password:', passInput)
        instance.password = generatePassword(passInput)
      }
    }, sequelize })

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Report);
  };
  return User;
};