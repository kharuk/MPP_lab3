const Sequelize = require("sequelize");
const db  = require('../config/db_connection');
const Film = require('./film');
const Cinema = require('./cinema');

const Session = db.define('session', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: Sequelize.STRING
    }
});

Film.belongsToMany(Cinema, { through: {model: Session, unique: false }, foreignKey: 'Film_Id'});
Cinema.belongsToMany(Film, { through: {model: Session, unique: false }, foreignKey: 'Cinema_Id', unique: false});
Session.sync();
module.exports = Session;