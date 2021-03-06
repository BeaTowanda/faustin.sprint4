var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
const recordar = require("./middlewares/recordarMiddle");
const locals = require("./middlewares/locals");
//const locals = require("./middlewares/locals");

/*ya instalé el multer ver en productRouter*/


const indexRouter = require('./routes/index');
const productRouter = require("./routes/product");
const usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secret word!',
  resave: false,
  saveUninitialized: true,
}))
app.use(recordar);
app.use(locals);

app.use('/', indexRouter);
app.use("/product", productRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

/*app.listen(3030, () => {
  console.log("Servidor funcionando")
})*/

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
