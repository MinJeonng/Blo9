const { DataTypes } = require('sequelize');

const SubscribeModel = (sequelize) => {
  return sequelize.define('subscribe', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });
};

module.exports = SubscribeModel;
