const express = require('express');
const {SubjectsRecord} = require("../../database/Records/SubjectsRecord");
const {GradesRecord} = require("../../database/Records/GradesRecord");
const {StudentsRecord} = require("../../database/Records/StudentsRecord");
const middleware = require("../../config/middleware");
const router = express.Router();
router.use(middleware);

router.get('/', async (req, res)=>{
    const grades = await GradesRecord.listAll();
    const AllastName = await StudentsRecord.getAllastName();
    const teachers = await SubjectsRecord.getAllastName();
    res.status(200).render("home", { layout: "diary/update-grade", grades, AllastName, teachers });
});

router.post('/', async (req, res) => {
    try {
        const studentLastName = req.body.student_last_name; 
        const grade = req.body.grade; 
        const subject = req.body.subject;
        const studentData = await StudentsRecord.selectByLastName(studentLastName); 
        const firstStudent = studentData[0]; 
        const lastName= firstStudent.lastName; 
        const studentID = firstStudent.nrIndexu;
        await GradesRecord.insert([studentID, lastName, subject, grade]);
      res.status(200).redirect('/update-grade/');
    } catch (error) {
      console.error('Error updating grades:', error);
      res.status(500).json({ error: 'Failed to update grades' });
    }
});

router.post('/delete/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
      await GradesRecord.delete(id);
      res.status(200).redirect('/update-grade/');
  } catch (error) {
      console.error(error);
      res.status(500).send('Something went wrong');
  }
});

module.exports = router;
