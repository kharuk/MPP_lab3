const express = require('express');
const cinemaService = require("../services/cinemaService");

const router = express.Router();

router.get('/', cinemaService.getCinemas);
router.post("/new", cinemaService.createCinema);
router.get("/edit/:id", cinemaService.showCinema);
router.put("/edit/:id", cinemaService.updateCinema);
router.delete("/delete/:id", cinemaService.deleteCinema);

module.exports = router;