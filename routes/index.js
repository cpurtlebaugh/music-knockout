var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//Tara's test page ;)
router.get('/taraindex', function(req, res, next) {
  res.render('taraindex', { title: 'Tara;)' });
});


// Users
router.get('/users', usersController.getAll);
router.get('/users/new', usersController.newUser);
router.post('/users', usersController.createUser);
router.get('/users/new', usersController.showUser);
router.get('/users/new', usersController.editUser);
router.put('/users/', usersController.updateUser);
router.delete('/users/:id', usersController.deleteUser);

module.exports = router;
