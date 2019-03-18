const express = require('express');
const sessionServices = require("../services/sessionService");

const router = express.Router();

router.get('/', sessionServices.getSessions);
router.get("/new", sessionServices.addNewSession);
router.post("/new", sessionServices.createSession);
router.get("/edit/:id", sessionServices.showSession);
router.put("/edit/:id", sessionServices.updateSession);
router.delete("/delete/:id", sessionServices.deleteSession);

module.exports = router;