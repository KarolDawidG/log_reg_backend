const {insertRoot, findRoot, createTasks, createAccounts, createStudents, createSubjects,
  createGrades, student_grades_subjects, insert_student_grades_subjects, delete_student_grades_subjects} = require('./querrys');

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
      await pool.query(insertRoot);
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
  createAccountsTable,
  createTasksTable,
  createSubjectsTable,
  createStudentGradesSubjects,
  createGradesTable,
  createStudentsTable,
  createRoot,
  createTriggedStudGradSub,
  deleteTriggedStudGradSub,
}