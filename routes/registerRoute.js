const express = require('express');
const {db} = require("../database/connect");
const bcrypt = require("bcrypt");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.get('/', (req, res)=>{
    res.status(200).res.render('home', {layout : 'register'});
});

router.post("/", async (req,res) => {
    const email = req.body.email;
    const username = req.body.username;
    try{
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        db.query(`INSERT INTO accounts (username, password, email) VALUES ("${username}", "${hashPassword}","${email}")`);
        console.log("Register Successful");
        res.redirect('/');
    }catch{
        res.send('Jakis blad');
    }
});

module.exports = router;