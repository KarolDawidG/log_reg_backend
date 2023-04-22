
const insertRoot = `INSERT INTO accounts (id, username, password, email, role) VALUES (UUID(), 'root', '$2b$10$8Lbg6tvI4e/mOyku3uvNNONfatfeTGHI/D531boVUqWIe3kTOKK/K', 'root@gmail.com', 'admin');`;

const findRoot = `SELECT id FROM accounts WHERE username = 'root'`;

const createTasks = `
      CREATE TABLE IF NOT EXISTS tasks (
        id INT(11) NOT NULL AUTO_INCREMENT,
        nazwa VARCHAR(70) NOT NULL DEFAULT '',
        tresc VARCHAR(500) NOT NULL DEFAULT '',
        user VARCHAR(50) NOT NULL,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
    `;

  const createAccounts = `
    CREATE TABLE IF NOT EXISTS accounts (
      id varchar(36) NOT NULL DEFAULT UUID(),
      username varchar(50) NOT NULL,
      password varchar(255) NOT NULL,
      email varchar(100) NOT NULL,
      role varchar(20) NOT NULL DEFAULT 'user',
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
    `;

   

    const createSubjects = `
    CREATE TABLE IF NOT EXISTS subjects (
      id CHAR(36) NOT NULL DEFAULT UUID(),
      name VARCHAR(20) NOT NULL DEFAULT '',
      teacher VARCHAR(50) NOT NULL,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
  `;

  const createStudents = `
  CREATE TABLE IF NOT EXISTS students (
    id CHAR(36) NOT NULL DEFAULT UUID(),
    nrIndexu INT(6) NOT NULL,
    firstName VARCHAR(16) NOT NULL DEFAULT '',
    lastName VARCHAR(24) NOT NULL DEFAULT '',
    email VARCHAR(24) NOT NULL DEFAULT '',
    year INT(4) NOT NULL,
    course VARCHAR(16) NOT NULL DEFAULT '',
    PRIMARY KEY (nrIndexu)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
`;

  const createGrades = `
  CREATE TABLE IF NOT EXISTS grades (
    id CHAR(36) NOT NULL DEFAULT UUID(),
    student_id INT(6) NOT NULL,
    student_last_name VARCHAR(24) NOT NULL,
    subject VARCHAR(70) NOT NULL DEFAULT '',
    grade INT(3) NOT NULL,
    timestamp DATE NOT NULL DEFAULT CURRENT_DATE,
    description VARCHAR(200) DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (student_id) REFERENCES students(nrIndexu) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
`;

const createTest = `
    CREATE TABLE IF NOT EXISTS test (
      id CHAR(36) NOT NULL DEFAULT UUID(),
      marka VARCHAR(20) NOT NULL DEFAULT '',
      model VARCHAR(20) NOT NULL DEFAULT '',
      kolor VARCHAR(20) NOT NULL DEFAULT '',
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
  `;

//for now, the following data is not used

  const student_grades_subjects   = `
  CREATE TABLE IF NOT EXISTS student_grades_subjects (
    id CHAR(36) NOT NULL DEFAULT UUID(),
    student_last_name VARCHAR(24) NOT NULL,
    grade INT(3) NOT NULL,
    subject_id INT(11) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
  `;

  const insert_student_grades_subjects = `
  CREATE TRIGGER IF NOT EXISTS insert_student_grades_subjects
AFTER INSERT ON grades
FOR EACH ROW
BEGIN
    INSERT INTO student_grades_subjects (student_last_name, grade, subject_id)
    VALUES (NEW.student_last_name, NEW.grade, NEW.subject_id)
    ON DUPLICATE KEY UPDATE grade = NEW.grade;
END;
`;

const delete_student_grades_subjects = `
CREATE TRIGGER IF NOT EXISTS delete_student_grades_subjects
AFTER DELETE ON grades
FOR EACH ROW
BEGIN
  DELETE FROM student_grades_subjects
  WHERE subject_id = OLD.subject_id
  AND student_last_name = OLD.student_last_name;
END;
`;

module.exports = {
    insertRoot,
    findRoot,
    createTasks,
    createAccounts,
    createStudents,
    createSubjects,
    createGrades,
    student_grades_subjects,
    insert_student_grades_subjects,
    delete_student_grades_subjects,
    createTest,
    
}