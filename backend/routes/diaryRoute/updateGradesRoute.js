const express = require('express');
const {GradesRecord} = require("../../database/Records/GradesRecord");
const {StudentsRecord} = require("../../database/Records/StudentsRecord");

const middleware = require("../../config/middleware");
const router = express.Router();
router.use(middleware);

router.get('/', async (req, res)=>{
    const grades = await GradesRecord.listAll();
    const AllastName = await StudentsRecord.getAllastName();
    

            res.status(200).render("home", { layout: "diary/update-grade", grades, AllastName });
});

// router.post('/', async (req, res) => {
//     const { firstName, lastName, email, year, course } = req.body;
    
//      try {
//        await StudentsRecord.insertStudent([firstName, lastName, email, year, course]);
//        res.status(200).redirect('/classDiary/');
//      } catch (error) {
//        console.error(error);
//        res.status(500).send('Unknown server error. Please contact your administrator.');
//      }
//   });
  
//   router.post('/delete/:id', async (req, res, next) => {
//     const id = req.params.id;
//     try {
//        await StudentsRecord.delete(id);
//        res.status(200).redirect('/classDiary/');
//     } catch (error) {
//        console.error(error);
//        res.status(500).send('Something went wrong');
//     }
//  });





module.exports = router;

