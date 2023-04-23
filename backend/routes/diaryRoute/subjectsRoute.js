const express = require('express');
const {SubjectsRecord} = require("../../database/Records/SubjectsRecord");
const router = express.Router();
const middleware = require('../../config/middleware')
router.use(middleware);

router.get('/', async (req, res, next) => {
    try {
        const subjects = await SubjectsRecord.listAll();
        res.status(200).render("home", { layout: "diary/subjects", subjects });
    } catch (error) {
        console.error(error);
        res.status(500).send('Unknown server error. Please contact your administrator.');
    }
    });

router.post('/', async (req, res) => {
    const name = req.body.name;
    const teacher = req.body.teacher;
    try{
        await SubjectsRecord.insert([name, teacher]);
        res.status(200).redirect('/subjects/'); 
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Unknown server error. Please contact your administrator.');
    }
    });

router.post('/delete/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        await SubjectsRecord.delete(id);
        res.status(200).redirect('/subjects/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Unknown server error. Please contact your administrator.');
    }
});

module.exports = router;
