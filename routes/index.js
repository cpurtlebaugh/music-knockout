var express = require('express');
var passport = require('passport');
var router = express.Router();
var User = require('../models/User');
var usersController = require('../controllers/usersController');
var trophiesController = require('../controllers/trophiesController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//login
router.get('/login', function(req, res) {
  res.render('users/login', {user : req.user});
});


// Handle Login Submission
router.post('/login', passport.authenticate(
  'local',
  {
    failureRedirect: '/login'
  }),
  function (req, res, next) {
    req.session.save(function (err) {
      if (err) return next(err);
      res.redirect('/');
    });
  }
);

// register
router.get('/register', function (req, res) {
  res.render('users/register');
});

// Handle the Submission of the Register Form
router.post('/register', function (req, res) {
  User.register(new User({

    username: req.body.username,
    name: req.body.name,
    age: req.body.age,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    wins: req.body.wins

  }), req.body.password, function(err, user) {
    if (err) return res.render('signup', {user: user});
    passport.authenticate('local')(req, res, function () {
      req.session.save(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect('/');
      });
    });
  });
});



// Logout a currently authenticated user
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});


// // THIS ROUTE CHECKS IF THE USER IS LOGGED IN
// router.get('/secret', isLoggedIn, function (req, res) {
//   res.render('secret', {user: req.user});
// });

// // THIS ONE TOO
// router.get('/potgold', isLoggedIn, function (req, res) {
//   res.render('potgold', {user: req.user});
// });




// middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();
  // if they aren't redirect them to the login page
  res.redirect('/login');
}


//FACEBOOK
router.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email', 'user_birthday', 'user_location']}));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/login'
}));
//END


// Trophies
router.get('/users/:id/trophies', trophiesController.getTrophies);

// Users
router.get('/users', usersController.getAll);
router.get('/users/new', usersController.newUser);
router.post('/users', usersController.createUser);
router.get('/users/new', usersController.showUser);
router.get('/users/new', usersController.editUser);
router.put('/users/', usersController.updateUser);
router.delete('/users/:id', usersController.deleteUser);
router.get('/game', usersController.mainGame);

module.exports = router;
