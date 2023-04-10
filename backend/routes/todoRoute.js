const express = require('express');
const router = express.Router();
const middleware = require('../config/middleware')
const {TaskRecord} = require("../database/TaskRecord");
const {pool} = require("../database/db");
router.use(middleware);

router.get('/', async (req, res, next) => {
    try {
        const tasks = await TaskRecord.listAll(req.cookies["user"]);
        res.render('layouts/main', {tasks});
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
});

router.post('/', async (req, res, next) => {
    try {
        const nazwa = req.body.nazwa;
        const tresc = req.body.tresc;
        const nameUser = req.cookies["user"];
        await pool.execute('INSERT INTO tasks ( nazwa, tresc, user) VALUES (?, ?, ?)', [nazwa, tresc, nameUser]);
        res.redirect('/todo');
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
});

router.post('/delete/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await pool.execute('DELETE FROM tasks WHERE id = ?', [id]);
        res.redirect('/todo');
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
});

module.exports = router;
