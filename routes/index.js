var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController');
var trophiesController = require('../controllers/trophiesController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET users listing. */
router.get('/users', usersController.getAll);
router.get('/users/new', usersController.newUser);
router.post('/users', usersController.createUser);
router.get('/users/:id', usersController.showUser);
router.get('/users/:id', usersController.editUser);
router.put('/users', usersController.updateUser);
router.delete('/users', usersController.deleteUser);

module.exports = router;
