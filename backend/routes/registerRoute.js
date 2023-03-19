const express = require('express');
const {db, queryReg} = require("../database/connect");
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
        db.query(queryReg, [username, hashPassword, email]);
        console.log(`Registration of user '${username}' completed successfully`);
        res.status(200).redirect('/');
    }catch{
        res.status(500).send('Unknown server error. Please contact your administrator.');
    }
});

module.exports = router;