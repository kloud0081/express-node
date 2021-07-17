var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var ourservice = require('./routes/ourservice');
var contactus = require('./routes/contactus');

var app = express();
function verificationtime(req,res,next){
  const day=new Date()
       if 
  (day.getDay()==6 || day.getDay()==0 ||  (parseInt(day.getHours())>=17) ||  (parseInt(day.getHours())<7)   ) 
       res.render("unvailable",{day:day})
        else
       next();
  }
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(verificationtime)

app.use('/',indexRouter);
app.use('/ourservice', ourservice);
app.use('/contactus', contactus);


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
