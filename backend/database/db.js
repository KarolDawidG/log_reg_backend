const {createPool} = require('mysql2/promise');
const {hostDB, userDB, passDB, nameDB} = require("../config/configENV");

const pool = createPool({
    host: hostDB,
    user: userDB,
    password: passDB,
    database: nameDB,
    namedPlaceholders: true,
    decimalNumbers: true,
});


module.exports = {
    pool,
}