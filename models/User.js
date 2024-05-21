'use strict';
const isAfter = require('date-fns/isAfter')

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: {
      field: 'first_name', //через field приводимо до snake_case
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:true,
        notEmpty: true
      }
    },
    lastName: {
      field: 'last_name',
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:true,
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull:true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    birthday: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: true,
        // дата народження НЕ пізніше сьогодні
        isValidDate(value) {
          if (isAfter(new Date(value), new Date()) ) {
            throw new Error('Your birthday must be earlier than today')
          }
        }
      }
    },
    gender: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    underscored: true //автоматично згенеровані стовпці з camelCase приведуться до snake_case
  });
  return User;
};