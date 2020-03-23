'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model;
  class Report extends Model {}

  Report.init({
    cases: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Please insert number of case!'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'No user data!'
        }
      }
    },
    CountryId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'No country data!'
        }
      }
    },
  }, { sequelize });

  Report.associate = function(models) {
    // associations can be defined here
    Report.belongsTo(models.Country)
    Report.belongsTo(models.User)
  };
  return Report;
};