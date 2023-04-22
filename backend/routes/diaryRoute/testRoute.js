const express = require('express');
const {pool} = require('../../database/db')
const {uniqueArray} = require('../../config/config');
const middleware = require("../../config/middleware");
const router = express.Router();
router.use(middleware);

router.get('/', async (req, res)=>{
    const query = `select * from test`;
    const allMarka = 'select marka from test';
    try{
        const [cars] = await pool.execute(query);
        const [marka] = await pool.execute(allMarka);
        const unique = await uniqueArray(marka);

        res.status(200).render("home", { layout: "diary/test", cars, unique});
    }catch(error){
        console.error(error);
        res.status(500).send('Unknown server error. Please contact your administrator.');
    }
});


module.exports = router;
