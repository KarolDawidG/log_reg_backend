const express = require('express');
const session = require('express-session');
const hbs = require('express-handlebars');
const {PORT,  SECRET} = require('./config/configENV');
const {limiter} = require('./config/config');
const cookieParser = require('cookie-parser');
const app = express();

const logRoute = require('./routes/loginRoute');
const regRoute = require('./routes/registerRoute');
const mailRoute = require('./routes/mailRoute');
const logoutRoute = require('./routes/logoutRoute');

app.use('/auth', logRoute );		//find bugs here
app.use('/logout', logoutRoute);
app.use('/register', regRoute );
app.use('/form', mailRoute );

app.use(cookieParser());
app.engine('.hbs', hbs.engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.use(limiter);
app.use(session({secret: SECRET,
						resave: true,
						saveUninitialized: true,
						cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000
}}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 	//dodac aby odczytac dane z formularza
app.use(express.static('public'));

// main menu			////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/', (req, res) => {
	res.status(200).render('home', {layout : 'login'});
});



console.log('Start...');
app.listen(PORT, ()=>{console.log(`Server Started on port ${PORT}`)});

/*
1. npm init -y
2. npm install bcrypt cookie-parser dotenv express express-handlebars express-rate-limit express-session mysql2 nodemailer nodemon
3. to scripts add "start": "node app.js"
4. to set database write:

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
for example: INSERT INTO accounts (username,password,email) values ('angela','jolina','angela@gmail.com');
or
INSERT INTO accounts (username,password,email) values ('Dupa','dupa','dupa@gmail.com');
*/

//How to get to database in cmd?
// 1. mysql -u root -p
// 2. SHOW DATABASES;
// 3. USE nodelogin;
// 4. SELECT * FROM accounts;