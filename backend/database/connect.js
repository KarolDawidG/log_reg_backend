const mysql = require("mysql2");
const {hostDB, userDB, passDB, nameDB} = require("../config/configENV");
const fs = require('fs');

const db = mysql.createPool({
    connectionLimit: 100,
    host     : hostDB,
    user     : userDB,
    password : passDB,
});

try {
    db.getConnection((err, connection) => {
        if (!err) {
            console.log(`Connected to database successfully.`);
            connection.query(`CREATE DATABASE IF NOT EXISTS ${nameDB}`, function (err, result) {
                if (err) throw err;
                console.log(`Database "${nameDB}" created successfully.`);
                connection.changeUser({ database: nameDB }, function (err) {
                    if (err) throw err;
                    databaseSetup(connection);
                });
            });
        } else {
            console.log("Error while connecting with database");
        }
    });
} catch (err) {
    console.error("Error while connecting to the database:", err);
}

const queryLogin = `SELECT * FROM accounts WHERE username = ?`;
const queryEmail = `SELECT * FROM accounts WHERE email = ?`;
const queryReg = "INSERT INTO accounts (username, password, email) VALUES (?, ?, ?)";
const queryParameterize =  /^[A-Za-z0-9]+$/;

function databaseSetup(connection) {
    const sqlScript = fs.readFileSync('./backend/database/nodelogin.sql', 'utf8');

    const sqlStatements = sqlScript.split(';');
    sqlStatements.pop();

    sqlStatements.forEach(function(statement) {
        connection.query(statement, function (error, results, fields) {
            if (error) {
                // Check if table already exists
                if (error.code === 'ER_TABLE_EXISTS_ERROR') {
                    console.log('Table already exists');
                } else {
                    throw error;
                }
            } else {
               console.log('Query executed successfully');
            }
        });
    });
}

module.exports = {
    db,
    queryLogin,
    queryEmail,
    queryParameterize,
    queryReg,
};
