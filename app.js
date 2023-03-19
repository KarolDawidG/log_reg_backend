const express = require('express');
const hbs = require('express-handlebars');
const {PORT} = require('./config/configENV');
const {limiter} = require('./config/config');
const middleware = require("./config/middleware");
const app = express();

const logRoute = require('./routes/loginRoute');
const regRoute = require('./routes/registerRoute');
const mailRoute = require('./routes/mailRoute');
const logoutRoute = require('./routes/logoutRoute');

app.engine('.hbs', hbs.engine({extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use('/auth', logRoute );
app.use('/logout', logoutRoute);
app.use('/register', regRoute );
app.use('/form', mailRoute );

app.use(limiter);
app.use(middleware);

// main menu			////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/', (req, res) => {
	res.status(200).render('home', {layout : 'login'});
});

console.log('Start...');
app.listen(PORT, ()=>{console.log(`Server Started on port ${PORT}`)});
