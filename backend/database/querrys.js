
const insertQuery = `INSERT INTO accounts (id, username, password, email, role) VALUES (UUID(), 'root', '$2b$10$8Lbg6tvI4e/mOyku3uvNNONfatfeTGHI/D531boVUqWIe3kTOKK/K', 'root@gmail.com', 'admin');`;

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

    const createStudents = `
    CREATE TABLE IF NOT EXISTS students (
      nrIndexu INT(6) NOT NULL AUTO_INCREMENT,
      firstName VARCHAR(16) NOT NULL DEFAULT '',
      lastName VARCHAR(24) NOT NULL DEFAULT '',
      email VARCHAR(24) NOT NULL DEFAULT '',
      year INT(4) NOT NULL,
      course VARCHAR(16) NOT NULL DEFAULT '',
      PRIMARY KEY (nrIndexu)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
  `;

  const createSubjects  = `
  CREATE TABLE IF NOT EXISTS subjects (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(70) NOT NULL DEFAULT '',
    description VARCHAR(500) NOT NULL DEFAULT '',
    teacher VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
  `;

  const createGrades   = `
  CREATE TABLE IF NOT EXISTS grades (
    id INT(11) NOT NULL AUTO_INCREMENT,
    student_id INT(6) NOT NULL,
    subject_id INT(11) NOT NULL,
    grade INT(3) NOT NULL,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    description VARCHAR(200) DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (student_id) REFERENCES students(nrIndexu) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
  `;


module.exports = {
    insertQuery,
    findRoot,
    createTasks,
    createAccounts,
    createStudents,
    createSubjects,
    createGrades,
}