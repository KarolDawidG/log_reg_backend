const { createPool } = require('mysql2/promise');
const { hostDB, userDB, passDB, nameDB } = require('../config/configENV');
const {insertQuery, findRoot, createTasks, createAccounts, createStudents, createSubjects,
  createGrades, student_grades_subjects, insert_student_grades_subjects, delete_student_grades_subjects} = require('./querrys');

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
        const tables = [createAccountsTable, createTasksTable, createRoot, createStudentsTable, createSubjectsTable, createGradesTable, createStudentGradesSubjects, createTriggedStudGradSub, deleteTriggedStudGradSub];
      for await (const table of tables) {
        await table(pool);
      }
  } catch (err) {
    console.error(err);
  }
})();

const createAccountsTable = async (pool) => {
    try {
      await pool.query(createAccounts);

    } catch (err) {
      console.error(err);
    }
  };

const createTasksTable = async (pool) => {
    try {
      await pool.query(createTasks);
    } catch (err) {
      console.error(err);
    }
  };

  const createSubjectsTable = async (pool) => {
    try {
      await pool.query(createSubjects);
    } catch (err) {
      console.error(err);
    }
  };

  const createStudentGradesSubjects = async (pool) => {
    try {
      await pool.query(student_grades_subjects);
    } catch (err) {
      console.error(err);
    }
  };

  const createGradesTable = async (pool) => {
    try {
      await pool.query(createGrades);
    } catch (err) {
      console.error(err);
    }
  };

  const createStudentsTable = async (pool) => {
    try {
      await pool.query(createStudents);
    } catch (err) {
      console.error(err);
    }
  };

const createRoot = async (pool) => {
  try {
    const [rows] = await pool.query(findRoot);
    if (rows.length === 0) {
      await pool.query(insertQuery);
      await console.log('User root (pass: Admin12#) has been adedd.');
    } else{
      await console.log('User root status: 1')
    }
  } catch (err) {
    console.error(err);
  }
};

const createTriggedStudGradSub = async (pool) => {
  try {
    await pool.query(insert_student_grades_subjects);
  } catch (err) {
    console.error(err);
  } 
};

const deleteTriggedStudGradSub = async (pool) => {
  try {
    await pool.query(delete_student_grades_subjects);
  } catch (err) {
    console.error(err);
  } 
};



module.exports = {
  pool,
};
