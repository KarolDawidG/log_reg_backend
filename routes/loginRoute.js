const express = require('express');
const {db} = require("../database/connect");
const bcrypt = require("bcrypt");
const router = express.Router();
const session = require('express-session');
const {SECRET} = require("../config/configENV");
const cookieParser = require("cookie-parser");

const checkLoggedIn = (req, res, next) => {
    if (!req.session.user && !req.cookies.user) {
        return res.status(401).render('home', {layout : 'beLogin'});
    }
    next();
};

router.use(cookieParser());
router.use(express.urlencoded({ extended: true }));
router.use(session({
    secret: SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000, semSite:'strict' }
}));


router.get('/', checkLoggedIn, (req, res) => {
    if (req.session.user) {
        res.status(200).render('home', { layout: 'home' });
    } else if (req.cookies.user) {
        req.session.user = req.cookies.user;
        req.session.loggedin = true;
        res.status(200).render('home', { layout: 'home' });
    } else {
        res.status(200).render('home', { layout: 'login' });
    }
});

router.post("/", (req, res)=> {
    const user = req.body.username;
    const password = req.body.password;

    if (!user || !password) {
        res.status(400).send('Username and password are required');
    }

    db.query(
        'SELECT * FROM accounts WHERE username = ?',
        [user],
        (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send('Error retrieving user from database');
            }
            if (results.length === 0) {
                res.status(401).render('home', {layout : 'wrongUser'});
            }
            const hashedPassword = results[0].password
            bcrypt.compare(password, hashedPassword, (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).render('home', {layout : 'wrongPass'});
                }
                if (!result) {
                    res.status(401).render('home', {layout : 'wrongPass'});
                } else {
                    req.session.loggedin = true;
                    req.session.user = user;
                    res.cookie('user', user);
                    console.log('Login successful');
                    res.status(200).render('home', {layout : 'home'});
                }
            });
        }
    );
});



module.exports = router;