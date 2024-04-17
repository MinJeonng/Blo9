const { DataTypes } = require('sequelize');

const CommentModel = (sequelize) => {
  return sequelize.define('comment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isSecret: {
      type: DataTypes.TINYINT(1),
      defaultValue: 0,
    },
    parentIndex: {
      type: DataTypes.INTEGER,
    },
    // postId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: 'blogs',
    //     key: 'id',
    //   },
    // },
  });
};
module.exports = CommentModel;
