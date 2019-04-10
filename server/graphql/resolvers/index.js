const filmService = require('../../services/filmService');
const cinemaService = require('../../services/cinemaService');
const sessionService = require('../../services/sessionService');
const userServices = require('../../services/authService');

const rootResolver = {
  ...filmService,
  ...cinemaService,
  ...sessionService
  //...userServices
};

module.exports = rootResolver;