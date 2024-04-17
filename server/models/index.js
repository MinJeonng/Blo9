'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.Member = require('./member')(sequelize);
db.Chat = require('./chat')(sequelize);
db.Room = require('./room')(sequelize);
db.Blog = require('./blog')(sequelize);
db.Category = require('./category')(sequelize);
db.Comment = require('./comment')(sequelize);
db.Post = require('./post')(sequelize);
db.Subscribe = require('./subscribe')(sequelize);
db.Like = require('./like')(sequelize);

db.Member.hasOne(db.Blog);
db.Blog.belongsTo(db.Member);

db.Blog.hasMany(db.Category);
db.Category.belongsTo(db.Blog);

db.Post.hasMany(db.Comment);
db.Comment.belongsTo(db.Post);

db.Member.hasMany(db.Comment);
db.Comment.belongsTo(db.Member);

db.Blog.hasOne(db.Post);
db.Post.belongsTo(db.Blog);

db.Category.hasOne(db.Post);
db.Post.belongsTo(db.Category);

db.Member.hasOne(db.Subscribe);
db.Subscribe.belongsTo(db.Member);

db.Blog.hasOne(db.Subscribe);
db.Subscribe.belongsTo(db.Blog);

db.Member.hasOne(db.Like);
db.Like.belongsTo(db.Member);

db.Post.hasOne(db.Like);
db.Like.belongsTo(db.Post);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
