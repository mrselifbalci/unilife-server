var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var citiesRouter = require('./routes/cities.routes.js');
var propertiesRouter = require('./routes/properties.routes.js');
var subscriptionsRouter = require('./routes/subscriptions.routes.js');
var usersRouter = require('./routes/users.routes');
var shortlistedPropertiesRouter = require('./routes/shortlistedProperties.routes');

//middlewares
const verifyToken = require('./auth/verifyToken');
// const isAdmin = require('./auth/isAdmin'); 

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//DB connection
require('./config/db.config')();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/', citiesRouter);
app.use('/', propertiesRouter);
app.use('/', subscriptionsRouter);
app.use('/', usersRouter);
app.use('/', shortlistedPropertiesRouter);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
