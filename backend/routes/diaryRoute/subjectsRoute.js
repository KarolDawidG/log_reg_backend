const express = require('express');
const {SubjectsRecord} = require("../../database/SubjectsRecord");
const router = express.Router();
const middleware = require('../../config/middleware')
router.use(middleware);

router.get('/', async (req, res, next) => {
        const subjects = await SubjectsRecord.listAll();
            res.status(200).render("home", { layout: "diary/subjects", subjects });
    });

module.exports = router;
