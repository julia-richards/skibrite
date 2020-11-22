'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Event.init({
    name: DataTypes.STRING,
    website: DataTypes.STRING,
    state: DataTypes.STRING,
    lat: DataTypes.BIGINT,
    long: DataTypes.BIGINT,
    distance: DataTypes.FLOAT,
    startsAt: DataTypes.DATE,
    endsAt: DataTypes.DATE,
    capacity: DataTypes.INTEGER,
    eventCategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};