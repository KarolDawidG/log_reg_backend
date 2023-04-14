const express = require('express');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/configENV');
const { UsersRecord } = require("../database/UsersRecord");
const bcrypt = require("bcrypt");
const router = express.Router();
const middleware = require('../config/middleware')
const { verifyToken } = require('../config/config');
const queryParameterize = /^[A-Za-z0-9]+$/;
router.use(middleware);

router.get('/', verifyToken, (req, res) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error(err);
                res.status(401).render('home', { layout: 'login' });
            } else {
                res.status(200).render('home', { layout: 'home' });
            }
        });
    } else {
        res.status(200).render('home', { layout: 'login' });
    }
});

router.post("/", async (req, res) => {
    const user = req.body.username;
    const password = req.body.password;
    if (!user || !password) {
        return res.status(400).send('Username and password are required');
    }
    const ifUser = await UsersRecord.selectByUsername([user]);
    if (user.match(queryParameterize)) {
        if (ifUser.length === 0) {
            res.status(401).render('home', { layout: 'wrongUser' });
        } else {
            const hashedPassword = ifUser[0].password;
            bcrypt.compare(password, hashedPassword, (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).send('Error retrieving password from database');
                }
                if (!result) {
                    res.status(401).render('home', { layout: 'wrongPass' });
                } else {
                    const token = jwt.sign({ username: user }, JWT_SECRET, { expiresIn: '720s' });
                    res.cookie('token', token, { httpOnly: true });
                    res.cookie('user', user, { httpOnly: true });
                    
                    if (ifUser[0].role === 'admin') {
                        res.status(200).render('home', { layout: 'admin' });
                    } else {
                        res.status(200).render('home', { layout: 'home' });
                    }
                }
            });
        };
    } else {
        res.status(400).send('You can\'t just do a SQL Injection attack and think everything is fine');
    }
});

module.exports = router;