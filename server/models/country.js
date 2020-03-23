'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model
  class Country extends Model {}
  
  Country.init({
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'Please insert a country!'
          }
        }
      },
      deaths: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: 'Please insert number of deaths!'
          }
        }
      },
      recovered: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: 'Please insert number of recovered patients!'
          }
        }
      },
      cases: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: 'Please insert number of cases!'
          }
        }
      },
    }, { sequelize });

  Country.associate = function(models) {
    // associations can be defined here
    Country.hasMany(models.Report);
  };
  return Country;
};
