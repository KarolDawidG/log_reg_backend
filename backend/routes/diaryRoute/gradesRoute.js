const express = require('express');
const { pool } = require("../../database/db");
const {GradesRecord} = require("../../database/Records/GradesRecord");
const router = express.Router();
const middleware = require('../../config/middleware')
router.use(middleware);

router.get('/', async (req, res, next) => {
    const studentId = req.query.student_id; 
    const subjects = await GradesRecord.listAll();
    let query = 'SELECT * FROM grades'; 
    
    if (studentId) {
        query = `SELECT * FROM grades WHERE student_id = ${studentId}`; 
    }

    const [results] = await pool.execute(query); 

    res.status(200).render("home", { layout: "diary/grades", results, subjects }); 
});

module.exports = router;