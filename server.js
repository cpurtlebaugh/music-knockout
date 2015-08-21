var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
//Its Capital Case because its a class (contructor function)
var LocalStrategy = require('passport-local').Strategy;
var Facebook = require('./config/facebook.js');
var routes = require('./routes/index');
var methodOverride = require('method-override');
var MongoStore = require('connect-mongo')(session);


//FOR OAUTH
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
//END

var app = express();

// if (app.get("env") === "development") {
//  mongoose.connect('mongodb://localhost/music-knockout');
// }

// production code
if (process.env.NODE_ENV === 'production') {
 mongoose.connect('mongodb://taylorharwood:dtla04@apollo.modulusmongo.net:27017/xanuG6ar');
 app.use(session({
   secret: 'keyboard cat',
   saveUninitialized: false, // don't create session until something stored
   resave: false, //don't save session if unmodified
   store: new MongoStore({
       url: 'mongodb://taylorharwood:dtla04@apollo.modulusmongo.net:27017/xanuG6ar',
       touchAfter: 24 * 3600 // time period in seconds
   })
 }));
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

if (app.get("env") === "development") {
 // auth middleware
 app.use(session({
   secret: 'jeong sings',
   resave: true,
   saveUninitialized: true
 }));
}

// auth middleware
app.use(require('express-session')({
    secret: 'WDI Rocks',
    resave: false,
    saveUninitialized: false
}));

//FOR OAUTH
app.use(session({secret: process.env.SECRET}));
// END
app.use(passport.initialize());
app.use(passport.session());

// use Middleware for isAuthenticated in views
app.use(function (req, res, next) {
  res.locals.login = req.isAuthenticated();

  if (res.locals.login) {
    console.log("HI JIM DON'T THINK I'M JANKY: ", req.user)
    res.locals.current_user = req.user;
  }

  next();
});

// passport config
var User = require('./models/User');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
