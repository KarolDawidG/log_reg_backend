const express = require('express');
const cookieParser = require("cookie-parser");

const middleware = express.Router();

middleware.use(express.static('public'));
middleware.use(cookieParser());
middleware.use(express.json());
middleware.use(express.urlencoded({ extended: true }));


module.exports = middleware;