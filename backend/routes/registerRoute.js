const express = require('express');
const {db, queryReg, queryEmail, queryLogin} = require("../database/connect");
const bcrypt = require("bcrypt");
const middleware = require("../config/middleware");
const router = express.Router();
router.use(middleware);

router.get('/', (req, res)=>{
    res.status(200).render('home', {layout : 'register'});
});

router.post('/', async (req, res) => {
    const { email, username, password } = req.body;

    try {
        //Checking if a user or email address exists in the database
        const emailExists = await db.promise().query(queryEmail, [email]);
        const loginExists = await db.promise().query(queryLogin, [username]);
        if (emailExists[0].length > 0 || loginExists[0].length > 0 ) {
            console.log('User with given parameters already exists');
            return res.status(401).render('home', {layout : 'repeatedUserEmail'});

        }

        const hashPassword = await bcrypt.hash(password, 10);
        await db.promise().query(queryReg, [username, hashPassword, email]);
        console.log(`Registration of user '${username}' completed successfully`);
        res.status(200).redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Unknown server error. Please contact your administrator.');
    }
});





// router.post('/',  async (req, res) => {
//     const { email, username, password } = req.body;
//     try {
//         const hashPassword = await bcrypt.hash(password, 10);
//         db.query(queryReg, [username, hashPassword, email]);
//         console.log(`Registration of user '${username}' completed successfully`);
//         res.status(200).redirect('/');
//     } catch {
//         res.status(500).send('Unknown server error. Please contact your administrator.');
//     }
// });




module.exports = router;