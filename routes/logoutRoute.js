const express = require('express');
const router = express.Router();
const session = require('express-session');
const { SECRET } = require("../config/configENV");
const cookieParser = require("cookie-parser");

router.use(cookieParser());
router.use(session({
    secret: SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 24 * 60 * 60 * 500, semSite:'strict' }
}));

router.get('/', (req, res, next) => {
    req.session.user = null;
    req.session.regenerate((err) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        console.log('User has logged out');
        res.clearCookie('user');
        res.redirect('/');
    });
});

module.exports = router;
