/* Module dependencies.*/
console.log('Starting app.js');
/*Load environment variables from .env file, where API keys and passwords are configured. Taken from ga-hackathon-starter.*/
import dotenv from 'dotenv';
dotenv.load({ path: '.env.example' });
console.log('Loaded app.js > dotenv > .env.example');

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Debug from 'debug';
import logger from 'morgan';
import lusca from 'lusca';
import mongoose from 'mongoose';
import passport from 'passport'
// import favicon from 'serve-favicon';
import path from 'path';
import lessMiddleware from 'less-middleware';

import index from './routes/index';
/**
 * Controllers (route handlers).
 */
import homeController from './controllers/home';
import userController from './controllers/user';
import apiController from './controllers/api';

/**
 * API keys and Passport configuration.
 */
import passportConfig from './config/passport-config';

// Setting up the app
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
import User from './models/userAccount';

//Connect to Google Maps Direction Service & Roads libraries
var googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_MAPS_SERVER_API_KEY
});

// view engine setup (Pug/Jade html preprocessor)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

//Express mounting of primary routes, i.e. ([path,] callback [, callback...])
app.use('/', index);
app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);
app.get('/signup', userController.getSignup);
app.post('/signup', userController.postSignup);
app.get('/account', passportConfig.isAuthenticated, userController.getAccount);
app.post('/account/profile', passportConfig.isAuthenticated, userController.postUpdateProfile);
app.post('/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword);
app.post('/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount);
app.get('/account/unlink/:provider', passportConfig.isAuthenticated, userController.getOauthUnlink);

/**
 * Sahat's Hackathon Starter Pack - API examples routes.
 */
app.get('/api', apiController.getApi);
app.get('/api/facebook', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFacebook);
app.get('/api/google-maps', apiController.getGoogleMaps);

/**
 * OAuth authentication routes. (Sign in)
 */
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
 res.redirect(req.session.returnTo || '/');
});
app.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
 res.redirect(req.session.returnTo || '/');
});


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

console.log('Loaded app.js');

export default app;
