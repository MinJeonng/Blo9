const { DataTypes } = require('sequelize');

const ChatModel = (sequelize) => {
  return sequelize.define('chat', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    chatMsg: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roomId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

module.exports = ChatModel;
