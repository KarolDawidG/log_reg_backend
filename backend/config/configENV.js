require('dotenv').config();

module.exports = {
    pass: process.env.PASS,
    user: process.env.USER,
    hostDB:process.env.HOST_DB || 'localhost', 
    nameDB:process.env.NAME_DB || 'nodelogin', 
    userDB:process.env.USER_DB || 'root', 
    passDB:process.env.PASS_DB || '',
    PORT:process.env.PORT || 3000,
    service:process.env.service,
};

