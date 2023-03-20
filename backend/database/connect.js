const mysql = require("mysql2");
const {hostDB, userDB, passDB, nameDB} = require("../config/configENV");

const db = mysql.createPool({
    connectionLimit: 100,
    host     : hostDB,
    user     : userDB,
    password : passDB,
    database : nameDB
});

db.getConnection( (err, connection)=> {
    if(!err) {
        console.log(`Database "${nameDB}" connected successful.`);
    } else {
        console.log("Error while connecting with database");
    }
});



const queryLogin = `SELECT * FROM accounts WHERE username = ?`;
const queryReg = "INSERT INTO accounts (username, password, email) VALUES (?, ?, ?)";
const queryParameterize =  /^[A-Za-z0-9]+$/;

module.exports = {
    db,
    queryLogin,
    queryParameterize,
    queryReg,
}