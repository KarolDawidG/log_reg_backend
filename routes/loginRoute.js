const express = require('express');
const {db} = require("../database/connect");
const bcrypt = require("bcrypt");
const router = express.Router();
const middleware = require('../config/middleware')
const {checkLoggedIn} = require('../config/config');

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

router.post("/", (req, res)=> {
    const user = req.body.username;
    const password = req.body.password;
    const queryLogin = `SELECT * FROM accounts WHERE username = ?`;
    const queryParameterize = /^[0-9a-fA-F]$/;

    if (!user || !password) {
        return res.status(400).send('Username and password are required');
    }
    if (!queryLogin.match(queryParameterize)) {
        db.query(queryLogin, [user], (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send('Error retrieving user from database');
            }

            if (results.length === 0) {
                res.status(401).render('home', {layout : 'wrongUser'});
            } else {
                const hashedPassword = results[0].password;
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
                        res.cookie('user', user);
                        console.log('Login successful');
                        res.status(200).render('home', {layout : 'home'});
                    }
                });
            }
        });

    } else {
        res.status(400).send('Abnormalities');
    }
});

module.exports = router;