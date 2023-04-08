const express = require('express');
const {db, queryReg, queryEmail, queryLogin, queryParameterize} = require("../database/connect");
const bcrypt = require("bcrypt");
const middleware = require("../config/middleware");
const router = express.Router();
router.use(middleware);

router.get('/', (req, res)=>{
    res.status(200).render('home', {layout : 'register'});
});

router.post('/', async (req, res) => {
    const { email, username, password } = req.body;
    // simple SQL Injection prevention
    if (username.match(queryParameterize)){
        try {
            //Checking if a user or email address exists in the database
            const userExists = {
                emailExists: await db.promise().query(queryEmail, [email]),
                loginExists: await db.promise().query(queryLogin, [username])
            }
            if (userExists.emailExists[0].length > 0 || userExists.loginExists[0].length > 0 ) {
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
    } else {
        res.status(400).send('You can\'t just do a SQL Injection attack and think everything is fine');
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