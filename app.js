const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const {PORT} = require('./backend/config/configENV');
const {limiter} = require('./backend/config/config');
const middleware = require("./backend/config/middleware");
const app = express();

const logRoute = require('./backend/routes/userRoute/loginRoute');
const adminRoute = require('./backend/routes/adminRoute/adminRoute');
const regRoute = require('./backend/routes/userRoute/registerRoute');
const mailRoute = require('./backend/routes/featuresRoute/mailRoute');
const logoutRoute = require('./backend/routes/userRoute/logoutRoute');
const todoRoute = require('./backend/routes/featuresRoute/todoRoute');
const usersRoute = require('./backend/routes/adminRoute/usersRoute');
const updateRole = require('./backend/routes/adminRoute/updateRole');
const updateStudents = require('./backend/routes/diaryRoute/updateStudents');
const aiTranslate = require('./backend/routes/featuresRoute/aiTranslate');
const classDiary = require('./backend/routes/diaryRoute/classDiaryRoute');
const subjects = require('./backend/routes/diaryRoute/subjectsRoute');
const updateGrades = require('./backend/routes/diaryRoute/updateGradesRoute');

app.set('views', path.join(__dirname, 'frontend/views'));
app.engine('.hbs', hbs.engine({
	extname: '.hbs',
	helpers: {
	  inc: function(value, options) {
		return parseInt(value) + 1;
	  }
	}
  }));

app.set('view engine', '.hbs');
app.use('/register', regRoute );
app.use('/auth', logRoute );
app.use('/admin', adminRoute );
app.use('/logout', logoutRoute);
app.use('/users', usersRoute );
app.use('/update-role', updateRole );
app.use('/update-students', updateStudents );
app.use('/todo', todoRoute );
app.use('/form', mailRoute );
app.use('/translate', aiTranslate );
app.use('/classDiary', classDiary );
app.use('/subjects', subjects );
app.use('/update-grade', updateGrades);

app.use(limiter);
app.use(middleware);

app.get('/', (req, res) => {
	res.status(200).render('home', {layout : 'users/login'});
});

app.listen(PORT, ()=>{console.log(`Server Started correctly on port ${PORT}`)});
