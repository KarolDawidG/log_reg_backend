const express = require('express');
const {UsersRecord} = require("../database/UsersRecord");
const bcrypt = require("bcrypt");
const middleware = require("../config/middleware");
const router = express.Router();
const queryParameterize =  /^[A-Za-z0-9]+$/;
router.use(middleware);

router.get('/', (req, res)=>{
    res.status(200).render('home', {layout : 'register'});
});

router.post('/', async (req, res) => {
    const { email, username, password } = req.body;
    if (username.match(queryParameterize)){
        try {
            const userExists = {
                emailExists: await UsersRecord.selectByEmail([email]),
                loginExists: await UsersRecord.selectByUsername([username])
            }
            if (userExists.emailExists && userExists.emailExists.length > 0 || userExists.loginExists && userExists.loginExists.length > 0 ) {
                return res.status(401).render('home', {layout : 'repeatedUserEmail'});
            }
            const hashPassword = await bcrypt.hash(password, 10);
            await UsersRecord.insert([username, hashPassword, email]);
            res.status(200).redirect('/');
        } catch (error) {
            console.error(error);
            res.status(500).send('Unknown server error. Please contact your administrator.');
        }
    } else {
        res.status(400).send('You can\'t just do a SQL Injection attack and think everything is fine');
    }
});

module.exports = router;

