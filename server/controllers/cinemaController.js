const express = require('express');
const cinemaService = require("../services/cinemaService");
const VerifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.get('/',VerifyToken, cinemaService.getCinemas);
router.post("/new",VerifyToken, cinemaService.createCinema);
router.get("/edit/:id",VerifyToken, cinemaService.showCinema);
router.put("/edit/:id",VerifyToken, cinemaService.updateCinema);
router.delete("/delete/:id",VerifyToken, cinemaService.deleteCinema);

module.exports = router;