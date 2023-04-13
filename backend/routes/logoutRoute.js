const express = require('express');
const router = express.Router();
const middleware = require('../config/middleware')
router.use(middleware);

router.get('/', (req, res, next) => {
        res.clearCookie('user');
        res.clearCookie('token');
        res.status(200).redirect('/');
    });

module.exports = router;
