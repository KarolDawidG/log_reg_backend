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

app.use('/auth', logRoute );
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
						cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000, semSite:'strict'
}}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// main menu			////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/', (req, res) => {
	res.status(200).render('home', {layout : 'login'});
});



console.log('Start...');
app.listen(PORT, ()=>{console.log(`Server Started on port ${PORT}`)});
