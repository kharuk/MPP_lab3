const User = require('../models/user');
const config = require('../config/jwtSecret');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

function loginUser(req, res) {
  User.findOne({ where: {email: req.body.email} })
    .then(user => {
      if (!user) return res.status(404).send('No user found.');

      let isPasswordValid = bcrypt.compareSync(req.body.password, user.password); 
      if (!isPasswordValid){
        return res.status(401).send({ auth: false, token: null });
      } 

      let token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });
    })
    .catch(err => res.status(500).send(err))
}

function registerUser(req, res) {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  User.create({
    name : req.body.name,
    email : req.body.email,
    password : hashedPassword
  })
  .then((user) => {
    let token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400
    });
    console.log(token);
    res.status(200).json({ auth: true, token: token });
  })
  .catch(err => res.status(400).send("unable to save to database"));
}

function logoutUser(req, res) {
  res.status(200).send({ auth: false, token: null });
}

module.exports = {
  logoutUser,
  registerUser,
  loginUser
};


