var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
