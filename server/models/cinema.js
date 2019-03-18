const Sequelize = require("sequelize");
const db  = require('../config/db_connection');

const Cinema = db.define('cinema', {
    name: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    }
});

Cinema.sync();

module.exports = Cinema;