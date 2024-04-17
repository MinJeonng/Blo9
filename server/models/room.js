const { DataTypes } = require('sequelize');

const RoomModel = (sequelize) => {
  return sequelize.define('room', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    roomId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recentMsg: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

module.exports = RoomModel;
