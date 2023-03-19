const express = require('express');
const router = express.Router();
const middleware = require('../config/middleware')
router.use(middleware);

router.get('/', (req, res, next) => {
    req.session.user = null;
    req.session.regenerate((err) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        console.log('User has logged out');
        res.clearCookie('user');
        res.status(200).redirect('/');
    });
});

module.exports = router;
