const filmService = require('../../services/filmService');
const userServices = require('../../services/authService');

const rootResolver = {
  ...filmService,
  //...userServices
};

module.exports = rootResolver;