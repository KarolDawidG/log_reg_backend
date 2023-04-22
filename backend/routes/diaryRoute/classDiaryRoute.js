const express = require('express');
const {StudentsRecord} = require("../../database/Records/StudentsRecord");
const {SubjectsRecord} = require("../../database/Records/SubjectsRecord");
const router = express.Router();
const middleware = require('../../config/middleware');
router.use(middleware);

router.get('/', async (req, res, next) => {
   const teachers = await SubjectsRecord.getAllastName();
   const students = await StudentsRecord.listAll();
   res.status(200).render("home", { layout: "diary/diary", students, teachers });
});

router.post('/', async (req, res) => {
    const { firstName, lastName, email, year, course } = req.body;
     try {
       await StudentsRecord.insert([firstName, lastName, email, year, course]);
       res.status(200).redirect('/classDiary/');
     } catch (error) {
       console.error(error);
       res.status(500).send('Unknown server error. Please contact your administrator.');
     }
  });
  
  router.post('/delete/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
       await StudentsRecord.delete(id);
       res.status(200).redirect('/classDiary/');
    } catch (error) {
       console.error(error);
       res.status(500).send('Something went wrong');
    }
 });


  
  

module.exports = router;
