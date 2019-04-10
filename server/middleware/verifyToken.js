let jwt = require('jsonwebtoken');
const config = require('../config/jwtSecret');
const {AuthenticationError} = require('apollo-server');

let verifyToken = ({req, res}) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
console.log(token);
  if(!token){
    res.status(401);
    throw new AuthenticationError('No token provided');
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      res.status(401);
      throw new AuthenticationError('Need to login');
    } 
  });
}

module.exports = verifyToken;