var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://new-user_31:password12345@cluster0.oqwop.mongodb.net/mydb1?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var urlRouter = require('./routes/shortener');
var shortRouter = require('./routes/shorturl');

var app = express();

app.listen(3000);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
 
  
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  
  app.use('/', indexRouter);
  app.use('/users', usersRouter);
  app.use('/api/shorten', urlRouter);
  app.use('/api/shorturl', shortRouter);
  

  //app.use('/api/shorturl', (req, res, next) => {
  //  console.log("/api/shorturl");
  //  res.end();
  //});
  
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
});

module.exports = app;
