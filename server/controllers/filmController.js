const express = require('express');
const filmServices = require("../services/filmService");
const VerifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.get('/',VerifyToken, filmServices.getFilms);
router.post("/new",VerifyToken, filmServices.createFilm);
router.get("/edit/:id",VerifyToken, filmServices.showFilm);
router.put("/edit/:id",VerifyToken, filmServices.updateFilm);
router.delete("/delete/:id",VerifyToken, filmServices.deleteFilm);




module.exports = router;