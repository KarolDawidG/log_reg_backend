const express = require('express');
const hbs = require('express-handlebars');
const {PORT} = require('./backend/config/configENV');
const {limiter} = require('./backend/config/config');
const middleware = require("./backend/config/middleware");
const app = express();

const logRoute = require('./backend/routes/loginRoute');
const regRoute = require('./backend/routes/registerRoute');
const mailRoute = require('./backend/routes/mailRoute');
const logoutRoute = require('./backend/routes/logoutRoute');
const todoRoute = require('./backend/routes/todoRoute');
const usersRoute = require('./backend/routes/usersRoute');
const updateRole = require('./backend/routes/updateRole');

app.engine('.hbs', hbs.engine({extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use('/auth', logRoute );
app.use('/logout', logoutRoute);
app.use('/register', regRoute );
app.use('/todo', todoRoute );
app.use('/form', mailRoute );
app.use('/users', usersRoute );
app.use('/update-role', updateRole );


app.use(limiter);
app.use(middleware);

app.get('/', (req, res) => {
	res.status(200).render('home', {layout : 'login'});
});

app.listen(PORT, ()=>{console.log(`Server Started correctly on port ${PORT}`)});
