const Sequelize = require('sequelize');
const db  = require('../config/db_connection');


const User = db.define('user', {
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
});

User.sync();

module.exports = User;