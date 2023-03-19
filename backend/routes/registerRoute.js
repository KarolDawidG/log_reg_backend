const express = require('express');
const {db} = require("../database/connect");
const bcrypt = require("bcrypt");
const middleware = require("../config/middleware");
const router = express.Router();
router.use(middleware);

router.get('/', (req, res)=>{
    res.status(200).render('home', {layout : 'register'});
});

router.post("/", async (req,res) => {
    const email = req.body.email;
    const username = req.body.username;
    try{
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        db.query(`INSERT INTO accounts (username, password, email) VALUES ("${username}", "${hashPassword}","${email}")`);
        console.log("Register Successful");
        res.status(200).redirect('/');
    }catch{
        res.status(500).send('Jakis blad');
    }
});

module.exports = router;