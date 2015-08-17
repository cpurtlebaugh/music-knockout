var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//login
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Log In' });
});


// router.post('/login', passport.authenticate(
//   'local',
//   {
//     failureRedirect: '/login'
//   }),
//   function (req, res, next) {
//     req.session.save(function (err) {
//       if (err) return next(err);
//       res.redirect('/');
//     });
//   }
// );

// register
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Sign Up' });
});

// router.post('/register', function (req, res) {

//   //code here to confirm password  
//   User.register(
//     new User({
//       username: req.body.username,
//       name: req.body.name,
//       age: req.body.age,
//     }), 
//     req.body.password, function(err, user) {
//     if (err) return res.render('auth/register', {user: user});
//     passport.authenticate('local')(req, res, function () {
//       req.session.save(function (err) {
//         if (err) {
//           return next(err);
//         }
//         res.redirect('/');
//       });
//     });
//   });
// });

// Trophies
router.get('/trophies', usersController.getAll);

// Users
router.get('/users', usersController.getAll);
router.get('/users/new', usersController.newUser);
router.post('/users', usersController.createUser);
router.get('/users/new', usersController.showUser);
router.get('/users/new', usersController.editUser);
router.put('/users/', usersController.updateUser);
router.delete('/users/:id', usersController.deleteUser);

module.exports = router;
