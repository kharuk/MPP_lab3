const express = require('express');
const sessionServices = require("../services/sessionService");
const VerifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.get('/',VerifyToken, sessionServices.getSessions);
router.get("/new",VerifyToken, sessionServices.addNewSession);
router.post("/new",VerifyToken, sessionServices.createSession);
router.get("/edit/:id",VerifyToken, sessionServices.showSession);
router.put("/edit/:id",VerifyToken, sessionServices.updateSession);
router.delete("/delete/:id",VerifyToken, sessionServices.deleteSession);

module.exports = router;