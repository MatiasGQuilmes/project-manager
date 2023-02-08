require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const router = require('express').Router();

const connectDB = require('./database/config');

const app = express();

const cors = require('cors');
const checkToken = require('./middlewares/checkToken');
const whiteList = [process.env.URL_FRONTEND];
const corsOptions = {
    origin: function (origin, callback) {
        if(whiteList.includes(origin)) {
          callback(null, true)
        }else{
          callback(new Error('Error de Cors'))
        }
    }
}


connectDB()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Rutas
app
.use(cors(corsOptions))//
.use('/api/auth',require('./routes/auth'))
.use('/api/users',require('./routes/users'))
.use('/api/projects', checkToken,require('./routes/projects'))
.use('/api/tasks',require('./routes/tasks'))


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
  res.status(err.status || 500).json({
     ok: false,
    msg: err.message ? err.message: 'hubo un error'
   }) 
  
 
});
module.exports = app;