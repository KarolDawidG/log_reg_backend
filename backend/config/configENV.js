require('dotenv').config();

module.exports = {
    pass: process.env.PASS,
    user: process.env.USER,
    hostDB:process.env.HOST_DB, 
    nameDB:process.env.NAME_DB, 
    userDB:process.env.USER_DB, 
    passDB:process.env.PASS_DB,
    PORT:process.env.PORT,
    SECRET:process.env.SECRET,
    JWT_SECRET:process.env.JWT_SECRET,
    service:process.env.service,
};

