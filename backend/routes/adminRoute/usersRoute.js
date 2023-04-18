const express = require('express');
const router = express.Router();
const middleware = require('../../config/middleware');
const { UsersRecord } = require('../../database/Records/UsersRecord');

router.use(middleware);

router.get('/', async (req, res, next) => {
   try {
      const usersList = await UsersRecord.listAll();
      res.status(200).render('home', {layout : 'features/users', usersList});
   } catch (error) {
      console.error(error);
      res.status(500).send('Something went wrong');
   }
});

router.post('/delete/:id', async (req, res, next) => {
   const id = req.params.id;
   try {
      await UsersRecord.delete(id);
      res.status(200).redirect('/users/');
   } catch (error) {
      console.error(error);
      res.status(500).send('Something went wrong');
   }
});



module.exports = router;
