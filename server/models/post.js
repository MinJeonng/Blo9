const { DataTypes } = require('sequelize');

const PostModel = (sequelize) => {
  return sequelize.define('post', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    postTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likeCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    hashtag: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    view: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
};
module.exports = PostModel;
