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

module.exports = router;
