const express = require('express');
const {GradesRecord} = require("../../database/GradesRecord");
const router = express.Router();
const middleware = require('../../config/middleware')
router.use(middleware);

router.get('/', async (req, res, next) => {
        const grades = await GradesRecord.listAll();
            res.status(200).render("home", { layout: "diary/grades", grades });
    });

module.exports = router;
