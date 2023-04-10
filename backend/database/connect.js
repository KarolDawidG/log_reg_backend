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
        //creates the database if it doesn't exist
        if (!err) {
            console.log(`Connected to database successfully.`);
            connection.query(createDatabase, function (err, result) {
                if (err) throw err;
                //the method is used to switch the current connection to the newly created database
                connection.changeUser({ database: nameDB }, function (err) {
                    //creates database tables if they don't exist
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
const createDatabase = `CREATE DATABASE IF NOT EXISTS ${nameDB}`;
const queryLogin = `SELECT * FROM accounts WHERE username = ?`;
const queryEmail = `SELECT * FROM accounts WHERE email = ?`;
const queryReg = "INSERT INTO accounts (username, password, email) VALUES (?, ?, ?)";
const queryParameterize =  /^[A-Za-z0-9]+$/;

//creates database tables if they don't exist
function databaseSetup(connection) {
    const sqlScript = fs.readFileSync('./backend/database/nodelogin.sql', 'utf8');
    const sqlStatements = sqlScript.split(';');
    //we use the pop() method to remove this last empty item from the array with the SQL queries
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
