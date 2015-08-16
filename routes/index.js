var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/users', usersController.getAll);
router.get('/users/new', usersController.newUser);

module.exports = router;
