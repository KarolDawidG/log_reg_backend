const express = require('express');
const { API_KEY } = require('../config/configENV');
const router = express.Router();
const middleware = require('../config/middleware');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

router.use(middleware);

router.get('/', async (req, res, next) => {
    try {
        res.status(200).render("home", { layout: "features/appTranslation" });
    } catch (error) {
        console.error(error)
    }
});

router.post('/', async (req, res, next) => {
    const { inputText } = req.body;
    
    const options = {
        method: 'POST',
        headers:{
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: `Przetłumacz na angielski ${inputText}`}],
            max_tokens: 100
        })
    }
    try{
        const response= await fetch('https://api.openai.com/v1/chat/completions', options);
        const data = await response.json();
        res.status(200).json({ output: data.choices[0].message.content });
    } catch (error){
        console.error(error)
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;

