const rateLimit = require("express-rate-limit");
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('./configENV');

const limiter = rateLimit({
    windowMs: 15*60*1000,   //15 minutes
    max: 99,                // limit each IP to 100 per windowMs
});

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
  
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error(err);
        return res.status(401).json({ message: 'Token is invalid' });
      }
  
      req.user = decoded;
      next();
    });
  };

module.exports = {
    limiter,
    verifyToken,
};