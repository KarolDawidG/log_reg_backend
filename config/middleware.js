const express = require('express');
const session = require('express-session');
const { SECRET } = require('../config/configENV');
const cookieParser = require("cookie-parser");

const middleware = express.Router();

middleware.use(express.static('public'));
middleware.use(cookieParser());
middleware.use(express.json());
middleware.use(express.urlencoded({ extended: true }));
middleware.use(session({
    secret: SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000, semiSite: 'strict' }
}));

module.exports = middleware;