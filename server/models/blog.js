const { DataTypes } = require('sequelize');

const BlogModel = (sequelize) => {
  return sequelize.define('blog', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    writerImg: {
      type: DataTypes.STRING,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNUll: false,
    },
    blogTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blogInfo: {
      type: DataTypes.STRING,
    },
    fontColor: {
      type: DataTypes.STRING,
    },
    bgColor: {
      type: DataTypes.STRING,
    },
    theme: {
      type: DataTypes.INTEGER,
      allowNUll: false,
      defaultValue: 1,
    },
    subscribeCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    view: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
};
module.exports = BlogModel;
