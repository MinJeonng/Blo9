const { DataTypes } = require('sequelize');

const CategoryModel = (sequelize) => {
  return sequelize.define('category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    group: {
      type: DataTypes.STRING,
    },
  });
};
module.exports = CategoryModel;
