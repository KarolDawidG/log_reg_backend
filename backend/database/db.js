const { createPool } = require('mysql2/promise');
const { hostDB, userDB, passDB, nameDB } = require('../config/configENV');
const {insertQuery, findRoot, createTasks, createAccounts, createStudents, createSubjects,
  createGrades} = require('./querrys')

const pool = createPool({
  host: hostDB,
  user: userDB,
  password: passDB,
  namedPlaceholders: true,
  decimalNumbers: true,
});

(async () => {
  try {
    const [rows] = await pool.query('SHOW DATABASES');
    const databases = rows.map((row) => row.Database);
      if (!databases.includes(nameDB)) {
        await pool.query(`CREATE DATABASE ${nameDB}`);
      }
        await pool.query(`USE ${nameDB}`);
          const tables = [createAccountsTable, createTasksTable, createRoot, createStudentsTable, createSubjectsTable, createGradesTable];
      for await (const table of tables) {
        await table(pool);
      }
    console.log(`\nConnected to database named: ${nameDB}\n`);
  } catch (err) {
    console.error(err);
  }
})();

const createAccountsTable = async (pool) => {
    try {
      await pool.query(createAccounts);
      console.log('The accounts table has been loaded.');
    } catch (err) {
      console.error(err);
    }
  };

const createTasksTable = async (pool) => {
    try {
      await pool.query(createTasks);
      console.log('The tasks table has been loaded.');
    } catch (err) {
      console.error(err);
    }
  };

  const createSubjectsTable = async (pool) => {
    try {
      await pool.query(createSubjects);
      console.log('The subjects table has been loaded.');
    } catch (err) {
      console.error(err);
    }
  };

  const createGradesTable = async (pool) => {
    try {
      await pool.query(createGrades);
      console.log('The grades table has been loaded.');
    } catch (err) {
      console.error(err);
    }
  };

  const createStudentsTable = async (pool) => {
    try {
      await pool.query(createStudents);
      console.log('The students table has been loaded.');
    } catch (err) {
      console.error(err);
    }
  };

const createRoot = async (pool) => {
  try {
    const [rows] = await pool.query(findRoot);
    if (rows.length === 0) {
      await pool.query(insertQuery);
      console.log('User root (pass: Admin12#) has been adedd.');
    } else{
      console.log('User root status: 1')
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  pool,
};
