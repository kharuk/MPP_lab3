let jwt = require('jsonwebtoken');
const config = require('../config/jwtSecret');

let verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if(!token){
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(500).send({ 
        auth: false, 
        message: 'Failed to authenticate token.' 
      });
    } 
    req.userId = decoded.id;
    next();   
  });
}

module.exports = verifyToken;