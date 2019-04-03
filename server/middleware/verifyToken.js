let jwt = require('jsonwebtoken');
const config = require('../config/jwtSecret');

let verifyToken = (token) => {
  //let token = req.headers['x-access-token'] || req.headers['authorization'];

  if(!token){
    return false;
  }
  console.log('token', token);
  let isChecked = jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      console.log('err', err);
      return false;
    } 
    //req.userId = decoded.id;
    return true  
  });
  return isChecked;
}

module.exports = verifyToken;