const express = require('express');
const filmControllers = require('../controllers/filmController');
const cinemaControllers = require('../controllers/cinemaController');
const sessionControllers = require('../controllers/sessionController');

const router = express.Router();
router.use('/films', filmControllers);
router.use('/cinemas', cinemaControllers);
router.use('/sessions', sessionControllers);
module.exports = router;