const express = require('express');
const {pool} = require('../database/db')
const middleware = require("../config/middleware");
const router = express.Router();


router.use(middleware);

router.get('/', (req, res)=>{
    res.status(200).redirect('/');
});

router.post('/', async (req, res) => {
    const user = req.body.username;
    const role = req.body.role;

    try {
        const query = `UPDATE accounts
                        SET role = '${role}'
                        WHERE username = '${user}'
                      `;
        await pool.query(query);
        res.status(200).redirect('/users/');
    } catch (error) {
        console.error(error);
        res.status(400).send('Something bad');
    }
});




module.exports = router;

