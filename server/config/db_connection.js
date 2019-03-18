const Sequelize = require("sequelize");

const connection = new Sequelize('cinema_db', 'root', '6852922', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

module.exports = connection;

