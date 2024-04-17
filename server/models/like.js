const { DataTypes } = require('sequelize');

const LikeModel = (sequelize) => {
  return sequelize.define('like', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });
};

module.exports = LikeModel;
