const express = require('express');
const {StudentsRecord} = require("../../database/Records/StudentsRecord");
const middleware = require("../../config/middleware");
const router = express.Router();
router.use(middleware);

router.get('/', async (req, res)=>{
    try {
        res.status(200).redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Unknown server error. Please contact your administrator.');
    }
});


router.post('/', async (req, res) => {
    const { nrIndexu, firstName, lastName, email, year, course } = req.body;
    try {
      await await StudentsRecord.update(nrIndexu, { firstName, lastName, email, year, course });
      res.status(200).redirect('/classDiary/');
    } catch (error) {
      console.error(error);
      res.status(500).send('Unknown server error. Please contact your administrator.');
    }
  });
  

module.exports = router;

