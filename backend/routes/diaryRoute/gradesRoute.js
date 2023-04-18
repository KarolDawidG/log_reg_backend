const express = require('express');
const {GradesRecord} = require("../../database/Records/GradesRecord");
const {AllGrades} = require("../../database/Records/AllGrades");
const router = express.Router();
const middleware = require('../../config/middleware')
router.use(middleware);

router.get('/', async (req, res, next) => {
        const grades = await GradesRecord.listAll();
        const gradesFromAll = await AllGrades.listAll();
            res.status(200).render("home", { layout: "diary/grades", grades, gradesFromAll });
    });

module.exports = router;
