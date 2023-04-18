const express = require('express');
const router = express.Router();
const middleware = require('../../config/middleware')
const {TaskRecord} = require("../../database/Records/TaskRecord");
router.use(middleware);


router.get('/', async (req, res, next) => {
    try {
        const tasks = await TaskRecord.listAll(req.cookies["user"]);
        res.status(200).render("home", { layout: "features/main", tasks });
    } catch (error) {
        console.error(error);
        res.status(500).send('Unknown server error. Please contact your administrator.');
    }
});

router.post('/', async (req, res, next) => {
    try {
        const nazwa = req.body.nazwa;
        const tresc = req.body.tresc;
        const nameUser = req.cookies["user"];
        await TaskRecord.insert([nazwa, tresc, nameUser]);
        res.redirect('/todo');
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong in POST method');
    }
});

router.post('/delete/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await TaskRecord.delete(id);
        res.status(200).redirect('/todo');
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong in DELETE method');
    }
});

module.exports = router;
