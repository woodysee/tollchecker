/* Module dependencies.*/
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Debug from 'debug';
/*Taken from ga-hackathon-starter. Below. */
import dotenv from 'dotenv';
/*Taken from ga-hackathon-starter. Above. */
import express from 'express';
import logger from 'morgan';
import mongoose from 'mongoose';
import passport from 'passport'
// import favicon from 'serve-favicon';
import path from 'path';
import lessMiddleware from 'less-middleware';
import index from './routes/index';

/*Load environment variables from .env file, where API keys and passwords are configured. Taken from ga-hackathon-starter.*/
dotenv.load({ path: '.env.example' });
/**
 * Taken from ga-hackathon-starter.
 */

const app = express();
//const debug = Debug('tollchecker:app');

/**
 * Connect to MongoDB. Taken from ga-hackathon-starter.
 */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

// Creation of models for ERP gantries
import Gantry from './models/gantry';
import Charges from './models/charges';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
/* eslint no-unused-vars: 0 */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Handle uncaughtException
process.on('uncaughtException', (err) => {
  console.log(err);
  //debug('Caught exception: %j', err);
  process.exit(1);
});

export default app;
