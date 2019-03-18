const express = require('express');
const filmServices = require("../services/filmService");

const router = express.Router();

router.get('/', filmServices.getFilms);
router.post("/new", filmServices.createFilm);
router.get("/edit/:id", filmServices.showFilm);
router.put("/edit/:id", filmServices.updateFilm);
router.delete("/delete/:id", filmServices.deleteFilm);




module.exports = router;