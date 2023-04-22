const { createPool } = require('mysql2/promise');
const { hostDB, userDB, passDB, nameDB } = require('../config/configENV');
const { createAccountsTable, createTasksTable, createSubjectsTable, createStudentGradesSubjects, createGradesTable, createStudentsTable, createRoot, createTriggedStudGradSub, deleteTriggedStudGradSub, createTableTest} = require('./dbCreator');


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
        const tables = [createAccountsTable, createTasksTable, createRoot, createStudentsTable, createSubjectsTable, createGradesTable, createTableTest];
      for await (const table of tables) {
        await table(pool);
      }console.log('Database started correctly');
  } catch (err) {
    console.error(err);
  }
})();




module.exports = {
  pool,
};
