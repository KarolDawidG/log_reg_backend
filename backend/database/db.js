const { createPool } = require('mysql2/promise');
const { hostDB, userDB, passDB, nameDB } = require('../config/configENV');


const pool = createPool({
  host: hostDB,
  user: userDB,
  password: passDB,
  namedPlaceholders: true,
  decimalNumbers: true,
});

// Sprawdzenie, czy baza danych istnieje
pool.query('SHOW DATABASES')
.then(([rows]) => {
    const databases = rows.map((row) => row.Database);
    if (!databases.includes(nameDB)) {
      console.log(`Utworzono baze danych o nazwie ${nameDB}`);
      return pool.query(`CREATE DATABASE ${nameDB}`);
    }
  })
  .then(() => {
    // Połącz się z bazą danych
    console.log(`Polaczono z baza danych o nazwie ${nameDB}`);
    return pool.query(`USE ${nameDB}`);
  })
  .then(()=>{
    createAccountsTable(pool);
  })
  .then(() => {
    // Połącz się z bazą danych
    console.log(`Polaczono z baza danych o nazwie ${nameDB}`);
    return pool.query(`USE ${nameDB}`);
  })
  .then(()=>{
    createTasksTable(pool);
  })
  .catch((err) => console.error(err));
  

const createAccountsTable = async (pool) => {
    try {
      const query = `
        CREATE TABLE IF NOT EXISTS accounts (
          id varchar(36) NOT NULL DEFAULT UUID(),
          username varchar(50) NOT NULL,
          password varchar(255) NOT NULL,
          email varchar(100) NOT NULL,
          PRIMARY KEY (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
      `;
      await pool.query(query);
      console.log('Tabela accounts utworzona.');
    } catch (err) {
      console.error(err);
    }
  };

  const createTasksTable = async (pool) => {
    try {
      const query = `
      CREATE TABLE IF NOT EXISTS tasks (
        id INT(11) NOT NULL AUTO_INCREMENT,
        nazwa VARCHAR(70) NOT NULL DEFAULT '',
        tresc VARCHAR(500) NOT NULL DEFAULT '',
        user VARCHAR(50) NOT NULL,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
    `;
      await pool.query(query);
      console.log('Tabela tasks utworzona.');
    } catch (err) {
      console.error(err);
    }
  }

module.exports = {
  pool,
};
