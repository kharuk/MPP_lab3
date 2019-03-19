const express = require('express');
const authService = require("../services/authService");
const router = express.Router();


const VerifyToken = require('../middleware/verifyToken');
const User = require('../models/user');

router.post("/login", authService.loginUser);
router.post("/register", authService.registerUser);
router.get("/logout", authService.logoutUser);

router.get('/me', VerifyToken, function(req, res, next) {
  console.log(req.userId);
  User.findById(req.userId)
  .then((user) => {
    if (!user) return res.status(404).send("No user found.");
    res.status(200).send(user);
  })
  .catch(err => res.status(500).send("There was a problem finding the user."));
});


module.exports = router;