const rateLimit = require("express-rate-limit");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const queryParameterize = /^[A-Za-z0-9]+$/;

const limiter = rateLimit({
    windowMs: 15*60*1000,   //15 minutes
    max: 99,                // limit each IP to 100 per windowMs
});

const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  },
});

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(200).render('home', { layout: 'beLogin' });
  }

  jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (err, decoded) => {
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
    publicKey,
    privateKey,
    queryParameterize,
};