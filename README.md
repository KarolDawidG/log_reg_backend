# simplyBackendApp

For now we have:
1. The login panel that reads data from the MySQL database.
2. After logging in, you can choose the project you want to display.
3. Simple user registration panel.
4. A contact form that allows you to send an email from a website visitor.
5. A simple todo list, which is based on a MySql database. It allows to add tasks and display them, depending on which user is logged in.
6. More small projects will be available soon!


The plans include:
1. Deploying the application to an external server in order to share it with other users for evaluation.

To instal app:
1. npm init -y
2. npm install bcrypt cookie-parser dotenv express express-handlebars express-rate-limit express-session mysql2 nodemailer nodemon
    or npm install package.json
3. you need to add and configure env file
4. to scripts add "start": "node app.js"
5. to set database write:

CREATE DATABASE IF NOT EXISTS `nodelogin` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `nodelogin`;

CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (1, 'test', 'test', 'test@test.com');
INSERT INTO accounts (username,password,email) values ('angela','jolina','angela@gmail.com');
INSERT INTO accounts (username,password,email) values ('Dupa','dupa','dupa@gmail.com');

//How to get to database in cmd?
// 1. mysql -u root -p (then type the password)
// 2. SHOW DATABASES;
// 3. USE nodelogin;
// 4. SELECT * FROM accounts;
This project has only one direct purpose, learning to code.
