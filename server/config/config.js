require('dotenv').config();

module.exports = {
  development: {
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: 'mysql',
    port: process.env.PORT,
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: process.env.PRODNAME,
    password: process.env.PRODPW,
    database: process.env.PRODDATA,
    host: process.env.PRODHOST,
    dialect: 'mysql',
    port: process.env.PORT,
  },
};
