const express = require('express');
const {pool} = require('../../database/db')
const middleware = require("../../config/middleware");
const router = express.Router();
router.use(middleware);


router.get('/', async (req, res) => {
    const { marka } = req.query; // Pobranie wartości parametru "marka" z URL
    const query = `select * from test WHERE marka = ?`; // Zapytanie SQL z filtrem według marki
    try {
        const [cars] = await pool.execute(query, [marka]); // Wykonanie zapytania z parametrem
        res.status(200).render("home", { layout: "diary/test", cars });
    } catch (error) {
        console.error(error);
        res.status(500).send('Unknown server error. Please contact your administrator.');
    }
});

module.exports = router;
