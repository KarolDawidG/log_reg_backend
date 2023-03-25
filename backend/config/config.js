const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 15*60*1000,   //15 minutes
    max: 100,                // limit each IP to 100 per windowMs
});

const checkLoggedIn = (req, res, next) => {
    if (!req.session.user && !req.cookies.user) {
        return res.status(401).render('home', {layout : 'beLogin'});
    }
    next();
};

const validatePasswords = (req, res) => {
    const { password, passwordRep } = req.body;
    if (password !== passwordRep) {
        res.status(401).render('home', {layout : 'wrongPass'});
    }
};

module.exports = {
    limiter,
    checkLoggedIn,
    validatePasswords,

};