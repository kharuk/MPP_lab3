const Sequelize = require('sequelize');
const db  = require('../config/db_connection');


const Film = db.define('film', {
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    director: {
        type: Sequelize.STRING
    }
});

Film.sync();

module.exports = Film;