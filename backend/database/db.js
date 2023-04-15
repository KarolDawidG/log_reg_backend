const { createPool } = require('mysql2/promise');
const { hostDB, userDB, passDB, nameDB } = require('../config/configENV');
const {insertQuery, findRoot, createTasks, createAccounts} = require('./querrys')

const pool = createPool({
  host: hostDB,
  user: userDB,
  password: passDB,
  namedPlaceholders: true,
  decimalNumbers: true,
});

pool.query('SHOW DATABASES')
.then(([rows]) => {
    const databases = rows.map((row) => row.Database);
    if (!databases.includes(nameDB)) {
      console.log(`Utworzono baze danych o nazwie ${nameDB}`);
      return pool.query(`CREATE DATABASE ${nameDB}`);
    }
  })
  .then(() => {
    console.log(`Polaczono z baza danych o nazwie ${nameDB}`);
    return pool.query(`USE ${nameDB}`);
  })
  .then(()=>{
    createAccountsTable(pool);
  })
  .then(() => {
    console.log(`Polaczono z baza danych o nazwie ${nameDB}`);
    return pool.query(`USE ${nameDB}`);
  })
  .then(()=>{
    createTasksTable(pool);
  })
  .then(() => {
    console.log(`Polaczono z baza danych o nazwie ${nameDB}`);
    return pool.query(`USE ${nameDB}`);
  })
  .then(()=>{
    console.log('\nWczytywanie root.\n');
    createRoot(pool);
  })
  .catch((err) => console.error(err));
  

const createAccountsTable = async (pool) => {
    try {
      await pool.query(createAccounts);
      console.log('Tabela accounts została wczytana.');
    } catch (err) {
      console.error(err);
    }
  };

const createTasksTable = async (pool) => {
    try {
      await pool.query(createTasks);
      console.log('Tabela tasks została wczytana.');
    } catch (err) {
      console.error(err);
    }
  };

const createRoot = async (pool) => {
  try {
    const [rows] = await pool.query(findRoot);
    if (rows.length === 0) {
      await pool.query(insertQuery);
      console.log('User root (pass: Admin12#) has been loaded.');
      
    } else {
      console.log('The root user already exists.');
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  pool,
};
