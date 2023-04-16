const express = require('express');
const router = express.Router();
const middleware = require('../../config/middleware')
router.use(middleware);

router.get('/', (req, res, next) => {
       
        res.status(200).send('Tutaj beda oceny');
    });

module.exports = router;
