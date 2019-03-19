const express = require('express');
const filmController = require('../controllers/filmController');
const cinemaController = require('../controllers/cinemaController');
const sessionController = require('../controllers/sessionController');
const authController = require('../controllers/authController');

const router = express.Router();
router.use('/films', filmController);
router.use('/cinemas', cinemaController);
router.use('/sessions', sessionController);
router.use('/auth', authController);
module.exports = router;