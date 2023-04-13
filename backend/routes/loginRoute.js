const express = require('express');
const {UsersRecord} = require("../database/UsersRecord");
const bcrypt = require("bcrypt");
const router = express.Router();
const middleware = require('../config/middleware')
const {checkLoggedIn} = require('../config/config');
const queryParameterize =  /^[A-Za-z0-9]+$/;
router.use(middleware);

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

router.post("/", async (req, res)=> {
    const user = req.body.username;
    const password = req.body.password;
    if (!user || !password) {
        return res.status(400).send('Username and password are required');
    }
    const ifUser =  await UsersRecord.selectByUsername([user]);
        if (user.match(queryParameterize)) {
            if (ifUser.length === 0) {
                res.status(401).render('home', {layout : 'wrongUser'});
            } else {
                const hashedPassword = ifUser[0].password;
                bcrypt.compare(password, hashedPassword, (error, result) => {
                    if (error) {
                        console.error(error);
                        res.status(500).send('Error retrieving password from database');
                    }
                    if (!result) {
                        res.status(401).render('home', {layout : 'wrongPass'});
                    } else {
                        req.session.loggedin = true;
                        req.session.user = user;
                        res.cookie('user', user, { httpOnly: true });
                        res.status(200).render('home', {layout : 'home'});
                    }
                });
            };

    } else {
        res.status(400).send('You can\'t just do a SQL Injection attack and think everything is fine');
    }
});

module.exports = router;

