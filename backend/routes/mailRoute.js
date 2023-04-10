const nodemailer = require("nodemailer");
const express = require('express');
const router = express.Router();
const middleware = require('../config/middleware')
const {user, pass, service} = require("../config/configENV");
router.use(middleware);

router.get('/', (req, res)=>{
    res.status(200).render('home', {layout : 'contact'});
});

router.post('/', async (req, res)=>{
    const { email, name, subject, message } = req.body;
    if (!email || !name || !subject || !message) {
        return res.status(400).send('Some fields are missing');
    }
    const transporter = nodemailer.createTransport({
        service: service,
        auth: {
            user: user,
            pass: pass
        }
    });
    const mailOptions = {
        from: email,
        to: user,
        subject: `Meesage from ${email}: ${subject}`,
        text:
            `Email sender: ${email}		
            Name of sender: ${name}
            Subject: ${subject}\n
            Message:\n ${message}.`
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log(`An email from user ${name} (email: ${email}) has been sent to ${mailOptions.to}`);
        res.status(200).send('success');
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred while sending the email');
    }
});

module.exports = router;